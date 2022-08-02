import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
     await User.create(
      {
        username:'lintang lazuardi',
        email:'lazuardilintang@apps.ipb.ac.id',
        password:'linlaz1110'
      }
     )
  }
}
