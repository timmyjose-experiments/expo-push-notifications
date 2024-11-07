use clap::Parser;

#[derive(Debug, Parser)]
#[command(version, about, long_about = None)]
pub struct Config {
    #[arg(short, long, env = "PUSH_NOTIFICATIONS_ACCESS_TOKEN")]
    pub push_notifications_access_token: String,
}
