import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { companies } from 'App/Utils'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    startTime: schema.date(),
    endTime: schema.date(),
    company: schema.enum(companies),
    project: schema.string(),
    notes: schema.string()
  })

  public cacheKey = this.ctx.routeKey

  public messages: CustomMessages = {}
}
