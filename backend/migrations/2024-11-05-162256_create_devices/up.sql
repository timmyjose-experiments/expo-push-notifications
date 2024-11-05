CREATE TABLE "devices"(
	"id" UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
	"expo_push_token" TEXT NOT NULL,
	"added_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

