import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { roles } from 'App/Utils'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('full_name').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180)
      table.enu('role', roles).notNullable().defaultTo('user')
      table.string('phone').nullable()
      table.string('remember_me_token').nullable()
      table.timestamp('hire_date').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
