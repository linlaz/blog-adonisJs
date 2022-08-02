import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string([
      rules.alpha(),
      rules.unique({ table: 'users', column: 'username' }),
      rules.minLength(5),
      rules.maxLength(20)
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true,})
    ]),
    password: schema.string([
      rules.maxLength(100),
      rules.minLength(8),
      rules.confirmed('passwordConfirmation')
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'required':'The {{ field }} is required',
    'minLength': 'The {{ field }} have minimum of {{ options.minLength }} characters',
    'maxLength': 'The {{ field }} have maximum of {{ options.maxLength }} characters',
    'unique': 'The {{ field }} has already been',
    'confirmed': 'The {{ field }} doest confirmed'
  }
}
