import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

export default class Records extends BaseModel {
  // table.increments('record_id')
  // table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE')
  // table.timestamp('start_time').notNullable()
  // table.timestamp('end_time').notNullable()
  // table.string('project').notNullable
  // table.string('notes', 4000).nullable()
  // table.boolean('payed').defaultTo(false).nullable()
  @column({ isPrimary: true })
  public recordId: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime()
  public startTime: DateTime

  @column.dateTime()
  public endTime: DateTime

  @column()
  public project: string

  @column()
  public notes: string

  @column()
  public payed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
