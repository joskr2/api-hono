ALTER TABLE `tasks` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `tasks` ALTER COLUMN "updated_at" TO "updated_at" integer DEFAULT CURRENT_TIMESTAMP;