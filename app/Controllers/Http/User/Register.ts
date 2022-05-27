import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'

export default class RegistersController {
  public async store({ request, response }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.create({ email })

    await user.save()

    const key = faker.datatype.uuid() + new Date().getTime()

    user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message) => {
      message.to(email)
      message.from('contato@owse.com.br', 'OWSE')
      message.subject('Ativação de conta')
      message.htmlView('emails/register', { link })
    })

    return response.ok({ message: 'E-mail de ativação enviado com sucesso' })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}
