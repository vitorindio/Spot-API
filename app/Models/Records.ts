import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'
import { Companies } from 'App/Utils'
import { DateTime } from 'luxon'

export default class Records extends BaseModel {
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
  public company: Companies

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
