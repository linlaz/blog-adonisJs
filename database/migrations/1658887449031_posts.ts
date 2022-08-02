import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PostStatus } from 'Contracts/enum'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('title').notNullable()
      table.string('slug').unique().notNullable()
      table.text('content')
      table.enum('status',Object.values(PostStatus)).defaultTo(PostStatus.DRAFT)

      //relasi dengan database lain
      // table.foreign('categoryId').references('categories.id').onDelete('CASCADE')
      table.integer('category_id').unsigned().references('id').inTable('categories').notNullable()
      // table.foreign('authorId').references('users.id').onDelete('CASCADE')
      table.integer('author_id').unsigned().references('id').inTable('users').notNullable()

      table.string('thumbnail').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
