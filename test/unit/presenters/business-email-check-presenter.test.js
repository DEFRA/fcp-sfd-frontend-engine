// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { businessEmailCheckPresenter } from '../../../src/presenters/business-email-check-presenter.js'

describe('businessEmailCheckPresenter', () => {
  let data
  let backLink
  let changeLink

  beforeEach(() => {
    backLink = { href: '/business-email-change' }
    changeLink = '/business-email-change'
    data = {
      customer: { userName: 'Alan Turing' },
      contact: { email: 'current@example.com' },
      changeBusinessEmail: 'pending@example.com',
      info: { businessName: 'Acme Farms', sbi: '123456789' }
    }
  })

  test('it returns the shared page data with the provided links', () => {
    expect(businessEmailCheckPresenter(data, backLink, changeLink)).toEqual({
      backLink,
      changeLink,
      pageTitle: 'Check your business email address is correct before submitting',
      metaDescription: 'Check the email address for your business is correct.',
      userName: 'Alan Turing',
      businessEmail: 'pending@example.com',
      businessName: 'Acme Farms',
      sbi: '123456789'
    })
  })

  test('it falls back to the current email when there is no pending change', () => {
    delete data.changeBusinessEmail
    expect(businessEmailCheckPresenter(data, backLink, changeLink).businessEmail).toEqual('current@example.com')
  })

  describe('when optional context fields are missing', () => {
    test('it defaults userName, businessName and sbi to null', () => {
      const result = businessEmailCheckPresenter({
        customer: {},
        contact: { email: 'current@example.com' },
        info: {}
      }, backLink, changeLink)

      expect(result.userName).toBeNull()
      expect(result.businessName).toBeNull()
      expect(result.sbi).toBeNull()
    })
  })
})
