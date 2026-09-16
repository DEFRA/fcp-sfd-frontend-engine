// The internal service reaches records by SBI/CRN search, so its paths are parameterised functions.
// The external service works from the signed-in user's own records, so its paths are static strings.
// The two sets are not interchangeable — use the one matching the consuming service.

export const INTERNAL_BUSINESS_CHANGE_LINKS = {
  businessName: (sbi) => `/business/${sbi}/name-change`,
  businessAddress: (sbi) => `/business/${sbi}/address-change`,
  businessPhone: (sbi) => `/business/${sbi}/phone-numbers-change`,
  businessEmail: (sbi) => `/business/${sbi}/email-change`,
  businessVat: (sbi) => `/business/${sbi}/vat-registration-number-change`,
  businessVatRemove: (sbi) => `/business/${sbi}/vat-registration-remove`,
  businessLegalStatus: (sbi) => `/business/${sbi}/legal-status-change`,
  businessLegalStatusRegistrationNumber: (sbi) => `/business/${sbi}/legal-status-enter`
}

export const INTERNAL_PERSONAL_CHANGE_LINKS = {
  personalName: (crn) => `/customer/${crn}/account-name-change`,
  personalAddress: (crn) => `/customer/${crn}/account-address-change`,
  personalPhone: (crn) => `/customer/${crn}/account-phone-numbers-change`,
  personalEmail: (crn) => `/customer/${crn}/account-email-change`,
  personalDateOfBirth: (crn) => `/customer/${crn}/account-date-of-birth-change`
}

export const EXTERNAL_BUSINESS_CHANGE_LINKS = {
  businessName: '/business-name-change',
  businessAddress: '/business-address-change',
  businessPhone: '/business-phone-numbers-change',
  businessEmail: '/business-email-change',
  businessVat: '/business-vat-registration-number-change',
  businessVatRemove: '/business-vat-registration-remove',
  businessLegalStatus: '/business-legal-status-change',
  businessType: '/business-type-change',
  businessFixNameNoPermission: '/business-fix-name-no-permission'
}

export const EXTERNAL_PERSONAL_CHANGE_LINKS = {
  personalName: '/account-name-change',
  personalAddress: '/account-address-change',
  personalPhone: '/account-phone-numbers-change',
  personalEmail: '/account-email-change',
  personalDateOfBirth: '/account-date-of-birth-change'
}
