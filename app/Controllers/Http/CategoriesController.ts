import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async show({request, view}:HttpContextContract){

    const data = await Category.query().where('slug_category', request.params().slug).preload('posts')

    view.render('category/category',{
      category: data
    })

  }
}
