ALTER TABLE `tasks` ALTER COLUMN "created_at" TO "created_at" text DEFAULT (datetime('now'));--> statement-breakpoint
ALTER TABLE `tasks` ALTER COLUMN "updated_at" TO "updated_at" text DEFAULT (datetime('now'));