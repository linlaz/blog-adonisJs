import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RedirectIfAuth {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    try {
      await auth.check()
      return response.redirect('/')
    } catch (error) {
      await next()
    }

    await next()
  }
}
