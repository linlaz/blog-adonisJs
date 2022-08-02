import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import slugfy from 'slugify'
import Post from './Post'
export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_category: string

  @column()
  public slug_category: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Post,{
    localKey:'id',
  })
  public posts: HasMany<typeof Post>

  @beforeSave()
  public static async slugfyTitle(category:Category) {
    if (category.$dirty.name_category) {
        category.slug_category = await slugfy(category.name_category,{lower: true});
    }
  }

  @beforeSave()
  public static async titleCategory(category:Category) {
    if (category.$dirty.name_category) {
      let name = category.name_category.split(" ");
      for (let i = 0; i < name.length; i++) {
        name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
      }
      let str2 = name.join(" ");
      category.name_category = await str2;
    }
  }
}
