import {
  formatBackLink,
  formatNumber,
  formatDisplayAddress,
  formatOriginalAddress,
  formatChangedAddress,
  formatDisplayAddresses,
  sortErrorsBySectionOrder
} from './base-presenter.js'

import {
  getActionText,
  formatCph,
  formatCphText,
  formatBusinessAddress
} from './business-details-presenter.js'

import { businessEmailChangePresenter } from './business-email-change-presenter.js'
import { businessEmailCheckPresenter } from './business-email-check-presenter.js'

export const presenters = {
  formatBackLink,
  formatNumber,
  formatDisplayAddress,
  formatOriginalAddress,
  formatChangedAddress,
  formatDisplayAddresses,
  sortErrorsBySectionOrder,
  getActionText,
  formatCph,
  formatCphText,
  formatBusinessAddress,
  businessEmailChange: businessEmailChangePresenter,
  businessEmailCheck: businessEmailCheckPresenter
}
