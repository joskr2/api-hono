ALTER TABLE `tasks` RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE `tasks` ADD `description` text;