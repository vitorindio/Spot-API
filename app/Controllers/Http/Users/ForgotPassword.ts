import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User, UserKey } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)

    const user = await User.findByOrFail('email', email)

    const key = faker.datatype.uuid() + user.id

    user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message) => {
      message.to(email)
      message.from('spot.owse@aol.com', 'OWSE – SPOT')
      message.subject('Redefinição de Senha')
      message.htmlView('emails/forgot-password', { link })
    })

    return response.ok({ message: 'E-mail de redefinição de senha enviado com sucesso' })
  }

  public async show({ params }: HttpContextContract) {
    await UserKey.findByOrFail('key', params.key)
  }

  public async update({ request }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    await userKey.load('user')

    userKey.user.merge({ password })

    await userKey.user.save()

    await userKey.delete()

    return { message: 'Senha atualizada com sucesso' }
  }
}
