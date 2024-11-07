use expo_push_notification_client::{
    Expo, ExpoPushMessage, ExpoPushReceipt, ExpoPushReceiptId, ExpoPushTicket,
};
use log::info;
use rand::seq::SliceRandom;
use std::collections::HashMap;

use crate::{
    error::{Error, HttpResult},
    handlers::Op,
    DB, QUOTES,
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

async fn notify(
    expo_client: &Expo,
    device_ids: Vec<String>,
    title: &str,
    body: String,
) -> HttpResult<HashMap<ExpoPushReceiptId, ExpoPushReceipt>> {
    let notification = ExpoPushMessage::builder(device_ids)
        .title(title.to_string())
        .body(body.to_string())
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

    Ok(expo_client
        .get_push_notification_receipts(notification_ids)
        .await?)
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
    let device_ids = vec![device_id];
    let receipts = notify(
        &expo_client,
        device_ids,
        "Calculation",
        create_body(op, x, y, res),
    )
    .await?;

    println!("receipts = {receipts:#?}");

    Ok(())
}

pub(crate) async fn notify_all_devices(expo_client: &Expo) -> HttpResult<()> {
    let db = DB.read().await;
    let device_ids = db
        .iter()
        .map(|device_id| device_id.to_owned())
        .collect::<Vec<_>>();

    if let Some(random_quote) = QUOTES.quotes.choose(&mut rand::thread_rng()) {
        let quote = format!("{}\n - {}", random_quote.quote, random_quote.author);
        let receipts = notify(&expo_client, device_ids, "Inspiration for Today", quote).await?;
        println!("receipts = {receipts:#?}");
    }

    Ok(())
}
