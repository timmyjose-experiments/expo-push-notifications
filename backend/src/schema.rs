// @generated automatically by Diesel CLI.

diesel::table! {
    devices (id) {
        id -> Uuid,
        expo_push_token -> Text,
        added_at -> Timestamptz,
    }
}
