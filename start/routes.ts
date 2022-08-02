/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

Route.get('/','PostsController.index').as('index-post')

//post frontend routes
// Route.get('/post/:slug','PostsController.show').as('show-post')
Route.
  group(()=>{
    Route.get('/:slug','PostsController.show').as('show-post')
}).prefix('post')


//category routes
Route.get('/category/:slug','CategoriesController.show').as('category-show')


//dashboard
Route.get('/dashboard',async({view, auth}) => {
  return view.render('dashboard/dashboard',{
    email: auth.user?.email
  })
}).middleware('auth:web').as('dashboard')


Route.get('/login','AuthController.login').as('login').middleware('RedirectIfAuth')
Route.post('/login','AuthController.actionLogin').as('action-login')

Route.get('/registrasi','AuthController.registrasi').as('registrasi').middleware('RedirectIfAuth')
Route.post('/registrasi','AuthController.actionRegistrasi').as('actionRegistrasi')
Route.get('/logout','AuthController.logout').as('logout')
Route.get('/forgot-password','AuthController.forgotPassword').as('forgot-password').middleware('RedirectIfAuth')
