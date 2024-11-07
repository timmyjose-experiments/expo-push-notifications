use expo_push_notification_client::{Expo, ExpoPushMessage, ExpoPushTicket};
use log::info;

use crate::{
    error::{Error, HttpResult},
    handlers::Op,
    DB,
};

fn create_body(op: Op, x: f64, y: f64, res: f64) -> String {
    let operation = match op {
        Op::Add => "+",
        Op::Sub => "-",
        Op::Mul => "*",
        Op::Div => "/",
    };

    format!("{x} {operation} {y} = {res}")
}

pub(crate) async fn notify_device(
    expo_client: &Expo,
    op: Op,
    x: f64,
    y: f64,
    res: f64,
    device_id: String,
) -> HttpResult<()> {
    let db = DB.read().await;

    if !db.contains(&device_id) {
        return Err(Error::DeviceNotRegistered(device_id));
    }

    // send notification
    info!("Sending notification to device_id: {device_id}");
    let notification = ExpoPushMessage::builder(vec![device_id])
        .title("Calculation")
        .body(create_body(op, x, y, res))
        .build()?;

    let tickets = expo_client.send_push_notifications(notification).await?;

    // process the responses
    let mut notification_ids = Vec::new();
    for ticket in tickets {
        match ticket {
            ExpoPushTicket::Ok(ticket) => {
                notification_ids.push(ticket.id);
            }
            ExpoPushTicket::Error(err) => {
                // todo - handle the error
                eprintln!("{err:#?}");
            }
        }
    }

    let receipts = expo_client
        .get_push_notification_receipts(notification_ids)
        .await?;

    println!("receipts = {receipts:#?}");

    Ok(())
}
