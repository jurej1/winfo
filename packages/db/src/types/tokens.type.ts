import { tokens } from "../schemas";

export type InsertTokenDB = typeof tokens.$inferInsert;

export type SelectTokenDB = typeof tokens.$inferSelect;
