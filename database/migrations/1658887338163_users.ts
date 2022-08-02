import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserStatus } from 'Contracts/enum'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('username').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable().unique()
      table.string('remember_me_token').nullable().unique()
      table.dateTime('bday').nullable()
      /*
      column enum
      refrence: https://github.com/adonisjs/core/discussions/1805
      */
      table.enum('status_user',Object.values(UserStatus)).defaultTo(UserStatus.ACTIVE)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
