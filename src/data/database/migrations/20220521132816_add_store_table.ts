import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(
    `
    CREATE TABLE store
    (
      uuid BINARY(16) NOT NULL,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY(uuid)
    );
    `
  )
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP TABLE IF EXISTS store`)
}
