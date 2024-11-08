A simple demo of Push Notifications using `expo-notifications`.

Functionality:

    - Settings page to request user for push notification permission.
    - Each app (device) generates an `ExpoPushToken` and sends it to the server to store in persistent storage (DB).
    - App is a calculator frontend. Calculations are done in the server, and results sent as push notifications to the app (the device which initiated the calculation).
    - App also has a button to force the server to trigger and immediate push notification to all registered devices, with a custom message (Some random quote).


## Build and Run

### Backend

`ngrok`:

```
$ ngrok http http://localhost:9871
```

Replace the url in `.env.local` with the url in the `ngrok` output.

Run the backend:

```
$ cd backend
$ RUST_LOG=INFo cargo run --release
```

This will start a server at `0.0.0.0:9871`.


### App

Create a development build:

```
$ eas build -p ios -e development [--local]
$ eas build -p android -e development [--local]

```

Start a local `expo` server:

```
$ npx expo start

```

Scan the QR Code with a scanner app (Camera app on `iOS`) and launch the app.

## Scenarios

Push Notifications.

#### Dev

* Server to a specific device [✅]
    - iOS [✅]
    - Android [✅]

* Sending to multiple devices [✅]
   - iOS []✅
   - Android[✅

* App in background [✅]
    - iOS [✅]
    - Android [✅]

* App in foreground [✅]
    - iOS [✅]
    - Android [✅]

* App closed []
    - iOS [✅]
    - Android [❌]  (Oppo A7, Android 8.1)
        (possibly model/OS specific as well: https://docs.expo.dev/push-notifications/receiving-notifications/#closed-notification-behavior)

* App uninstalled and reinstalled []
    - iOS [✅] (registering agin gives same expo push token)
    - Android [⚠️] (registering again gives different expo push token)


#### Production

* Server to a specific device []
    - iOS []
    - Android []

* Sending to multiple devices []
   - iOS []
   - Android[]

* App in background []
    - iOS []
    - Android []

* App in foreground []
    - iOS []
    - Android []

* App closed []
    - iOS []
    - Android []

* App uninstalled and reinstalled []
    - iOS []
    - Android []

