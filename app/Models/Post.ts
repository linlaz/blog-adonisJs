import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import slugfy from 'slugify'
import Category from './Category'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public slug: string

  @column()
  public content: string

  @column()
  public categoryId: number

  @column()
  public authorId: number

  @column()
  public thumbnail: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



  //relasi data category
  @belongsTo(() => Category,{
    foreignKey:'categoryId',
  })
  public category: BelongsTo<typeof Category>


  //relasi data author dari class user
  @belongsTo(() => User,{
    foreignKey: 'authorId',
  })
  public author: BelongsTo<typeof User>



  @beforeSave()
  public static async generateSlug(post:Post) {
    if (post.$dirty.title) {
      post.slug = await slugfy(post.title,{lower: true});

    }
  }

}
