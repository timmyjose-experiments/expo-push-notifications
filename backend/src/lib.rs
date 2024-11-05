use actix_cors::Cors;
use actix_server::Server;
use actix_web::{web, App, HttpServer};
use handlers::{calculate, invalidate_device, register_device};

mod db;
pub mod error;
pub mod handlers;

struct AppState {}

pub async fn create_server(addr: &str) -> eyre::Result<Server> {
    Ok(HttpServer::new(move || {
        let cors = Cors::permissive();
        App::new()
            .app_data(web::Data::new(AppState {}))
            .wrap(cors)
            .service(register_device)
            .service(invalidate_device)
            .service(calculate)
    })
    .bind(addr)?
    .run())
}
