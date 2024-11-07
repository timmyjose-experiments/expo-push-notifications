use actix_web::{post, web, HttpResponse, Responder};
use log::info;
use serde::{Deserialize, Serialize};

use crate::{
    calc::{add, div, mul, sub},
    error::{Error, HttpResult},
    notifications::notify_device,
    AppState,
};

#[post("/register-device")]
pub async fn register_device() -> impl Responder {
    info!("register_device");
    HttpResponse::Ok().body("register_device")
}

// useful for testing
#[post("/unregister-device")]
pub async fn unregister_device() -> impl Responder {
    info!("unregister_device");
    HttpResponse::Ok().body("unregister_device")
}

// useful for testing
#[post("/notify-all-devices")]
pub async fn notify_all_devices() -> impl Responder {
    info!("notify_all_devices");
    HttpResponse::Ok().body("notify_all_devices")
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

        notify_device(&state.expo_notifications_client, op, x, y, res, device_id).await?;
        Ok(web::Json(CalculateResponse))
    } else {
        Err(Error::MissingDevice)
    }
}
