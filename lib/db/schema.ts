import { pgTable, pgEnum, text, timestamp, integer, numeric, boolean, uuid, jsonb } from "drizzle-orm/pg-core";

export const leadStatus = pgEnum("lead_status", ["new", "contacting", "interested", "checkout_sent", "won", "lost", "no_response"]);
export const taskStatus = pgEnum("task_status", ["todo", "in_progress", "blocked", "done"]);
export const transactionType = pgEnum("transaction_type", ["income", "expense", "refund", "fee"]);

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const goals = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  unit: text("unit").notNull().default("number"),
  targetValue: numeric("target_value", { precision: 14, scale: 2 }).notNull(),
  currentValue: numeric("current_value", { precision: 14, scale: 2 }).notNull().default("0"),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  dueAt: timestamp("due_at", { withTimezone: true }),
  status: text("status").notNull().default("active"),
  departmentId: uuid("department_id").references(() => departments.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatus("status").notNull().default("todo"),
  priority: text("priority").notNull().default("medium"),
  dueAt: timestamp("due_at", { withTimezone: true }),
  departmentId: uuid("department_id").references(() => departments.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true })
});

export const processes = pgTable("processes", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  title: text("title").notNull(),
  objective: text("objective").notNull(),
  frequency: text("frequency").notNull(),
  ownerRole: text("owner_role").notNull().default("Founder / CEO"),
  indicator: text("indicator"),
  status: text("status").notNull().default("draft"),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const processSteps = pgTable("process_steps", {
  id: uuid("id").defaultRandom().primaryKey(),
  processId: uuid("process_id").notNull().references(() => processes.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  instruction: text("instruction").notNull()
});

export const publications = pgTable("publications", {
  id: uuid("id").defaultRandom().primaryKey(),
  platform: text("platform").notNull().default("instagram"),
  title: text("title").notNull(),
  format: text("format").notNull(),
  status: text("status").notNull().default("planned"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  reach: integer("reach").notNull().default(0),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  shares: integer("shares").notNull().default(0),
  saves: integer("saves").notNull().default(0),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  contact: text("contact"),
  source: text("source").notNull().default("instagram"),
  interest: text("interest"),
  status: leadStatus("status").notNull().default("new"),
  nextAction: text("next_action"),
  nextActionAt: timestamp("next_action_at", { withTimezone: true }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const interactions = pgTable("interactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  channel: text("channel").notNull().default("instagram"),
  summary: text("summary").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull()
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("BRL"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  externalId: text("external_id").unique(),
  customerName: text("customer_name").notNull(),
  productId: uuid("product_id").references(() => products.id),
  grossAmount: numeric("gross_amount", { precision: 12, scale: 2 }).notNull(),
  feesAmount: numeric("fees_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  netAmount: numeric("net_amount", { precision: 12, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  source: text("source").notNull().default("manual"),
  purchasedAt: timestamp("purchased_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: transactionType("type").notNull(),
  description: text("description").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
  category: text("category"),
  orderId: uuid("order_id").references(() => orders.id),
  notes: text("notes")
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: text("actor_id"),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});
