A simple demo of Push Notifications using `expo-notifications`.

Functionality:

    - Settings page to request user for push notification permission.
    - Each app (device) generates an `ExpoPushToken` and sends it to the server to store in persistent storage (DB).
    - App is a calculator frontend. Calculations are done in the server, and results sent as push notifications to the app (the device which initiated the calculation).
    - Every [10, 30] seconds (randomly picked), the server sends a push notification to every registered device.
    - App also has a button to force the server to trigger and immediate push notification to all registered devices, with a custom message.


## Build and Run

### Backend

DB:

```
$ cp .env.development .env
```

and update `username` and `password` in the `.env` file.

```
$ diesel setup
```




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

