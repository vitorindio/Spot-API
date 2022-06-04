import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Records } from 'App/Models'
import { StoreValidator } from 'App/Validators/Records'

export default class RecordsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    await auth.use('api').check()
    const id = auth.use('api').user!.id

    const record = await Records.create({ userId: id, ...data })

    return response.json(record)
  }

  public async show({ auth }: HttpContextContract) {
    return auth.user
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
