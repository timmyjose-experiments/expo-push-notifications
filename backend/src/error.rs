use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use expo_push_notification_client::{CustomError, ValidationError};
use serde_json::json;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Custom(#[from] CustomError),

    #[error(transparent)]
    Eyre(#[from] eyre::Report),

    #[error(transparent)]
    Validatiron(#[from] ValidationError),

    #[error("device {0} is not registered")]
    DeviceNotRegistered(String),

    #[error("no device id specified")]
    MissingDevice,
}

impl ResponseError for Error {
    fn status_code(&self) -> actix_web::http::StatusCode {
        match self {
            Error::MissingDevice | Error::DeviceNotRegistered(_) => StatusCode::BAD_REQUEST,
            Error::Custom(_) | Error::Eyre(_) | Error::Validatiron(_) => {
                StatusCode::INTERNAL_SERVER_ERROR
            }
        }
    }

    fn error_response(&self) -> actix_web::HttpResponse {
        let err_msg = self.to_string();
        println!("About to send error message: {err_msg:#?}");
        HttpResponse::build(self.status_code()).json(json!({"error": err_msg}))
    }
}

pub type HttpResult<T> = std::result::Result<T, Error>;
