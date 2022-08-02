import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class AuthController {

 public async login({view}:HttpContextContract) {
  return view.render('auth/login')
 }

 public async actionLogin({response, request, auth}:HttpContextContract){
  const email = request.input('email')
  const password = request.input('password')
  const remember = request.input('remember')
  let rememberMe = false;
  if (remember) {
    rememberMe = true;
  }
  try {
    await auth.use('web').attempt(email, password, rememberMe)
    response.redirect('/dashboard')
  } catch (error) {
    return response.badRequest('Invalid credentials')
  }
 }

 public async registrasi({view}:HttpContextContract) {
  return view.render('auth/registrasi')
 }

public async actionRegistrasi({auth, response, request}:HttpContextContract){
  const createUser = await request.validate(CreateUserValidator)
  const userCreated = await User.create(createUser)
  await auth.use('web').login(userCreated, true)
  return response.redirect('/')
}

 public async logout({auth, response}:HttpContextContract) {
  await auth.use('web').logout()
  response.redirect('/login')
 }

 public async forgotPassword({view}:HttpContextContract) {
  return view.render('auth/forgot-password')
 }

}
