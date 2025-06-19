// db/schema.ts

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const thoughts = sqliteTable('thoughts', {
  id: text('id').primaryKey(),
  content: text('content'),
  createdBy: text('created_by') ,   // your thought text
  createdAt: integer('created_at')  // timestamp
});
