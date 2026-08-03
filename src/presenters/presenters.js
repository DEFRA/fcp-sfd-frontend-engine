import {
  formatBackLink,
  formatNumber,
  formatDateInputValues,
  formatLongDate,
  sortErrorsBySectionOrder
} from './base-presenter.js'

import {
  getActionText,
  formatCph,
  formatCphText,
  formatBusinessAddress
} from './business-details-presenter.js'

import {
  addressBackLink,
  addressChangeLink,
  formatDisplayAddress,
  formatOriginalAddress,
  formatChangedAddress,
  formatDisplayAddresses
} from './address-presenter.js'

export const presenters = {
  formatBackLink,
  formatNumber,
  formatDateInputValues,
  formatLongDate,
  formatDisplayAddress,
  formatOriginalAddress,
  formatChangedAddress,
  formatDisplayAddresses,
  sortErrorsBySectionOrder,
  getActionText,
  formatCph,
  formatCphText,
  formatBusinessAddress,
  addressBackLink,
  addressChangeLink
}
