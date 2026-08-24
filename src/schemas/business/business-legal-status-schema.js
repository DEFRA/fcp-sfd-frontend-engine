import { Joi } from '../../utils/joi.js'
import { BUSINESS_LEGAL_STATUS_CODES } from '../../constants/business-legal-status.js'

const ERROR_MESSAGE = 'Select a legal status'

export const businessLegalStatusSchema = Joi.object({
  // Restricting to our own known codes means an invalid/tampered value is treated the same as no selection
  businessLegalStatus: Joi.string()
    .valid(...BUSINESS_LEGAL_STATUS_CODES)
    .required()
    .messages({
      'string.empty': ERROR_MESSAGE,
      'any.required': ERROR_MESSAGE,
      'any.only': ERROR_MESSAGE
    })
})
