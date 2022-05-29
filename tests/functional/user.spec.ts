import faker from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('users', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('[store] - able to send mail after pre-registration', async ({ assert, client }) => {
    const mailer = Mail.fake()

    await client.post('/admin/register').form({
      fullName: faker.name.findName(),
      email: faker.internet.email(),
      redirectUrl: 'http://spot-owse.vercel.app/users/register'
    })

    assert.isTrue(
      mailer.exists((mail) => {
        return mail.from?.address === 'spot.owse@aol.com' && mail.subject === 'Ativação de conta'
      })
    )

    Mail.restore()
  })
})
