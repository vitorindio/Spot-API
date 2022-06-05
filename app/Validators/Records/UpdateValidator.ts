import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { companies } from 'App/Utils'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    recordId: schema.number(),
    startTime: schema.date(),
    endTime: schema.date(),
    company: schema.enum(companies),
    project: schema.string({ trim: true }),
    notes: schema.string.optional({ trim: true })
  })

  public cacheKey = this.ctx.routeKey

  public messages: CustomMessages = {}
}
