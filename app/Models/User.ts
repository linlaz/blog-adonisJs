import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from './Post'
import { UserStatus } from 'Contracts/enum'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string


  /*
  serializeAs: null
  berfungsi tidak menampilkan data
  */
  @column({serializeAs: null})
  public password: string

  @column()
  public rememberMeToken?: string

  @column.date()
  public bday?: DateTime

  /*
  column enum
  refrence: https://github.com/adonisjs/core/discussions/1805
  */

  @column()
  public status_user: UserStatus

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relasi hasmany data dengan data post
  @hasMany(() => Post,{
    localKey: 'id',
  })
  public posts: HasMany<typeof Post>


  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
