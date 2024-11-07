### Main resources

    * https://docs.expo.dev/push-notifications/push-notifications-setup/
    * https://docs.expo.dev/push-notifications/fcm-credentials/ (`Android`)
    * `iOS` - normal configuration via certificates
    * https://expo.dev/notifications (test tool)


## Checklist

* `ExpoPushToken` - https://docs.expo.dev/push-notifications/faq/#when-and-why-does-the-expopushtoken-change

* `HTTPv2 API` vs `expo` server  SDK:
    https://docs.expo.dev/push-notifications/sending-notifications/#http2-api
    https://docs.expo.dev/push-notifications/sending-notifications/#send-push-notifications-using-a-server

* Error Handling - https://docs.expo.dev/push-notifications/sending-notifications/#implement-push-notifications-reliably


## Notes

* On `iOS`, the same `expo` push token is generated, even after app reinstall.
  On `Android`, app uninstall followed by reinstall generates a different `expo` push token.