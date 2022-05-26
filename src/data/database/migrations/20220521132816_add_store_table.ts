import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(
    `
    CREATE TABLE store
    (
      id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY(id)
    );
    `
  )
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP TABLE IF EXISTS store`)
}
