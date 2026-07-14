import { Joi } from '../../utils/joi.js'

const CHOOSE_ADDRESS_ERROR = 'Choose an address'

export const addressesSchema = Joi.object({
  addresses: Joi.string()
    .invalid('display')
    .required()
    .messages({
      'any.required': CHOOSE_ADDRESS_ERROR,
      'string.empty': CHOOSE_ADDRESS_ERROR,
      'any.invalid': CHOOSE_ADDRESS_ERROR
    })
})
