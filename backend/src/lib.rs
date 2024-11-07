use actix_cors::Cors;
use actix_server::Server;
use actix_web::{web, App, HttpServer};
use clap::Parser;
use config::Config;
use expo_push_notification_client::{Expo, ExpoClientOptions};
use handlers::{calculate, notify_all_devices, register_device, unregister_device};
use lazy_static::lazy_static;
use std::{collections::HashSet, sync::Arc};
use tokio::sync::RwLock;

mod calc;
mod config;
mod db;
pub mod error;
pub mod handlers;
mod notifications;

lazy_static! {
    pub static ref DB: RwLock<HashSet<String>> = RwLock::new(HashSet::new());
}

struct AppState {
    expo_notifications_client: Arc<Expo>,
}

async fn create_expo_notifications_client(access_token: &str) -> Expo {
    Expo::new(ExpoClientOptions {
        access_token: Some(access_token.to_owned()),
    })
}

pub async fn create_server(addr: &str) -> eyre::Result<Server> {
    let config = Config::parse();
    let expo_notifications_client =
        create_expo_notifications_client(&config.push_notifications_access_token).await;

    Ok(HttpServer::new(move || {
        let cors = Cors::permissive();
        App::new()
            .app_data(web::Data::new(AppState {
                expo_notifications_client: Arc::new(expo_notifications_client.clone()),
            }))
            .wrap(cors)
            .service(register_device)
            .service(unregister_device)
            .service(calculate)
            .service(notify_all_devices)
    })
    .bind(addr)?
    .run())
}
