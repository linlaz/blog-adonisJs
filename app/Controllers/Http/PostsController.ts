import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {

 public async index({view}:HttpContextContract) {

  const posts = await Post.query().preload('category').preload('author')
  // const posts = await Post.load()
  return view.render('welcome',{
    data:posts
  });

 }

 public async show({request, view}:HttpContextContract) {
  // const posts = await Post.findByOrFail('slug',request.params().slug).load((loader)=>{
  //   loader.load('category').load('author')
  // })

  const posts = await Post.query().where('slug',request.params().slug).preload('author').preload('category').firstOrFail()
  // console.log(posts);

  return view.render('post/show-post',{
    data:posts
  })
 }


}
