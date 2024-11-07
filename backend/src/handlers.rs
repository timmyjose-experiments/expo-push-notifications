use actix_web::{post, web};
use log::info;
use serde::{Deserialize, Serialize};

use crate::{
    calc::{add, div, mul, sub},
    error::{Error, HttpResult},
    notifications, AppState, DB,
};

#[derive(Debug, Deserialize)]
struct RegisterDeviceRequest {
    #[serde(rename = "deviceId")]
    device_id: String,
}

#[derive(Debug, Serialize)]
pub struct RegisterDeviceResponse {
    registered: bool,
}

#[post("/register-device")]
pub async fn register_device(
    body: web::Json<RegisterDeviceRequest>,
) -> HttpResult<web::Json<RegisterDeviceResponse>> {
    info!("register_device, body={body:#?}");

    let device_id = body.device_id.clone();
    let mut db = DB.write().await;
    db.insert(device_id);
    info!("device {:#?} registered", body.device_id);

    Ok(web::Json(RegisterDeviceResponse { registered: true }))
}

// useful for testing
#[derive(Debug, Deserialize)]
struct UnregisterDevicerRequest {
    #[serde(rename = "deviceId")]
    device_id: String,
}

#[derive(Debug, Serialize)]
pub struct UnregisterDeviceResponse {
    unregistered: bool,
}

#[post("/unregister-device")]
pub async fn unregister_device(
    body: web::Json<UnregisterDevicerRequest>,
) -> HttpResult<web::Json<UnregisterDeviceResponse>> {
    info!("unregister_device, body={body:#?}");

    let device_id = body.device_id.clone();

    let mut db = DB.write().await;
    if !db.contains(&device_id) {
        return Err(Error::DeviceNotRegistered(device_id));
    }

    db.remove(&device_id);
    info!("device {:#?} unregistered", body.device_id);

    Ok(web::Json(UnregisterDeviceResponse { unregistered: true }))
}

#[derive(Debug, Serialize)]
pub struct NotifyAllDevicesResponse;

// useful for testing
#[post("/notify-all-devices")]
pub async fn notify_all_devices(
    state: web::Data<AppState>,
) -> HttpResult<web::Json<NotifyAllDevicesResponse>> {
    info!("notify_all_devices");
    notifications::notify_all_devices(&state.expo_notifications_client).await?;
    Ok(web::Json(NotifyAllDevicesResponse))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "lowercase")]
pub(crate) enum Op {
    Add,
    Sub,
    Mul,
    Div,
}

#[derive(Debug, Deserialize)]
struct CalculateRequest {
    op: Op,
    x: f64,
    y: f64,
    #[serde(rename = "deviceId")]
    device_id: Option<String>,
}

#[derive(Debug, Serialize)]
struct CalculateResponse;

#[post("/calculate")]
pub async fn calculate(
    state: web::Data<AppState>,
    body: web::Json<CalculateRequest>,
) -> HttpResult<web::Json<CalculateResponse>> {
    info!("calculate, body={body:#?}");

    let CalculateRequest {
        op,
        x,
        y,
        device_id,
    } = body.into_inner();

    if let Some(device_id) = device_id {
        let res = match op {
            Op::Add => add(x, y).await,
            Op::Sub => sub(x, y).await,
            Op::Mul => mul(x, y).await,
            Op::Div => div(x, y).await,
        };

        notifications::notify_device(&state.expo_notifications_client, op, x, y, res, device_id)
            .await?;
        Ok(web::Json(CalculateResponse))
    } else {
        Err(Error::MissingDevice)
    }
}
