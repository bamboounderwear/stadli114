import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const designTokens = sqliteTable("design_tokens", {
  key: text("key").primaryKey(),
  value: text("value").notNull()
})

export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  body: text("body"),
  featuredImage: text("featured_image"),
  publishedAt: text("published_at")
})

export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  bio: text("bio"),
  image: text("image")
})

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  image: text("image")
})

export const venues = sqliteTable("venues", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  json: text("json")
})

export const games = sqliteTable("games", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  date: text("date").notNull(),
  opponent: text("opponent").notNull(),
  venueId: integer("venue_id").notNull()
})
