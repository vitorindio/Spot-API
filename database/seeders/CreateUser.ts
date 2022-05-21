import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class CreateUsersSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        fullName: 'Administrador',
        email: 'admin@owse.com.br',
        password: 'admin123',
        role: 'admin'
      },
      {
        fullName: 'User',
        email: 'user@owse.com.br',
        password: 'user123',
        role: 'user'
      }
    ])
  }
}
