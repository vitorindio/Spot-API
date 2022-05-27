import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullName: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email()]),
    phone: schema.string.optional({ trim: true }),
    password: schema.string.optional({ trim: true }, [rules.confirmed('passwordConfirmation'), rules.minLength(6)])
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
