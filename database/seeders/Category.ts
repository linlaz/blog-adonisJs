import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run () {
    await Category.createMany(
      [
        {
          name_category:'Programming Web Application'
        },
        {
          name_category:'programming mobile'
        }
      ]
    )
  }
}
