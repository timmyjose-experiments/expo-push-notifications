use actix_web::{post, HttpResponse, Responder};
use log::info;

#[post("/register_device")]
pub async fn register_device() -> impl Responder {
    info!("register_device");
    HttpResponse::Ok().body("register_device")
}

#[post("invalidate_device")]
pub async fn invalidate_device() -> impl Responder {
    info!("invalidate_device");
    HttpResponse::Ok().body("invalidate_device")
}

#[post("/calculate")]
pub async fn calculate() -> impl Responder {
    info!("calculate");
    HttpResponse::Ok().body("calculate")
}
