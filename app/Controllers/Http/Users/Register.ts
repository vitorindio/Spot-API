import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { User, UserKey } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/Register'

export default class RegistersController {
  public async store({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { fullName, email, redirectUrl } = await request.validate(StoreValidator)

      const user = await User.create({ fullName, email })

      user.useTransaction(trx)

      user.fullName = fullName
      user.email = email

      await user.save()

      const key = faker.datatype.uuid() + new Date().getTime()

      user.related('keys').create({ key })

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

      await Mail.send((message) => {
        message.to(email)
        message.from('spot.owse@aol.com', 'OWSE – SPOT')
        message.subject('Ativação de conta')
        message.htmlView('emails/register', { link })
      })

      return response.ok({ message: 'E-mail de ativação enviado com sucesso' })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    const user = await userKey.related('user').query().firstOrFail()

    return user
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, fullName, password, phone } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    const user = await userKey.related('user').query().firstOrFail()

    user.merge({ fullName, password, phone })

    await user.save()

    await userKey.delete()

    return response.ok({ message: 'Usuário atualizado com sucesso' })
  }
}
