use backend::create_server;
use log::info;

const BACKEND_ADDR: &str = "0.0.0.0:9871";

#[tokio::main]
async fn main() -> eyre::Result<()> {
    env_logger::init();

    info!("Started server on {BACKEND_ADDR}");
    let _ = create_server(BACKEND_ADDR).await?.await?;
    Ok(())
}
