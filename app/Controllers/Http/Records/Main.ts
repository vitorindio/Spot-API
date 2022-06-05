import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Records } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/Records'

export default class RecordsController {
  public async index({}: HttpContextContract) {
    return Records.all()
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const user = await auth.authenticate()

    const record = await Records.create({ userId: user.id, ...data })

    return response.json(record)
  }

  public async show({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()

    const records = await Records.query().where('user_id', user.id)

    return response.json(records)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)

    const record = await Records.findByOrFail('record_id', data.recordId)

    const user = await auth.authenticate()

    if (record.userId !== user.id) {
      return response.status(401).json({
        error: 'You are not authorized to update this record.'
      })
    }

    record.merge(data)

    await record.save()

    return response.send(record)
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    const { recordId } = request.all()

    const record = await Records.findByOrFail('record_id', recordId)

    const user = await auth.authenticate()

    if (record.userId !== user.id) {
      return response.status(401).json({
        error: 'You are not authorized to delete this record.'
      })
    }

    await record.delete()

    return response.json({ message: 'Record deleted successfully.' })
  }
}
