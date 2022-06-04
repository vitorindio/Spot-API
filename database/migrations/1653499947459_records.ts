import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { companies } from 'App/Utils'

export default class Records extends BaseSchema {
  protected tableName = 'records'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('record_id')
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE')
      table.timestamp('start_time').notNullable()
      table.timestamp('end_time').notNullable()
      table.enu('company', companies).notNullable().defaultTo(companies[0])
      table.string('project').notNullable
      table.string('notes', 4000).nullable()
      table.boolean('payed').defaultTo(false).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
