import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'

export default class extends BaseSeeder {
  public async run () {
    await Post.createMany(
      [
        {
          title: 'Hello World',
          content: 'disini ada content',
          categoryId: 1,
          authorId: 1,
          thumbnail: 'https://www.google.com/img/images/',
        },
        {
          title: 'Hello World version 2',
          content: 'disini ada content',
          categoryId: 1,
          authorId: 1,
          thumbnail: 'https://www.google.com/img/images/',
        },
        {
          title: 'Hello World version 3',
          content: 'disini ada content',
          categoryId: 1,
          authorId: 1,
          thumbnail: 'https://www.google.com/img/images/',
        },
        {
          title: 'Hello World version 4',
          content: 'disini ada content',
          categoryId: 1,
          authorId: 1,
          thumbnail: 'https://www.google.com/img/images/',
        }
      ]
    )
  }
}
