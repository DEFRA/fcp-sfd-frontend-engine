// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
import { businessEmailChangePresenter } from '../../../src/presenters/business-email-change-presenter.js'

describe('businessEmailChangePresenter', () => {
  let data
  let backLink

  beforeEach(() => {
    backLink = { href: '/business-details' }
    data = {
      customer: { userName: 'Alan Turing' },
      contact: { email: 'current@example.com' },
      info: { businessName: 'Acme Farms', sbi: '123456789' }
    }
  })

  test('it returns the shared page data with the provided back link', () => {
    expect(businessEmailChangePresenter(data, undefined, backLink)).toEqual({
      backLink,
      pageTitle: 'What is your business email address?',
      metaDescription: 'Update the email address for your business.',
      userName: 'Alan Turing',
      businessEmail: 'current@example.com',
      businessName: 'Acme Farms',
      sbi: '123456789'
    })
  })

  describe('when determining the businessEmail value', () => {
    test('it prioritises the payload', () => {
      data.changeBusinessEmail = 'pending@example.com'
      expect(businessEmailChangePresenter(data, 'payload@example.com', backLink).businessEmail).toEqual('payload@example.com')
    })

    test('it falls back to the pending change when there is no payload', () => {
      data.changeBusinessEmail = 'pending@example.com'
      expect(businessEmailChangePresenter(data, undefined, backLink).businessEmail).toEqual('pending@example.com')
    })

    test('it falls back to the current email when there is no payload or pending change', () => {
      expect(businessEmailChangePresenter(data, undefined, backLink).businessEmail).toEqual('current@example.com')
    })
  })

  describe('when optional context fields are missing', () => {
    test('it defaults userName, businessName and sbi to null', () => {
      const result = businessEmailChangePresenter({
        customer: {},
        contact: { email: 'current@example.com' },
        info: {}
      }, undefined, backLink)

      expect(result.userName).toBeNull()
      expect(result.businessName).toBeNull()
      expect(result.sbi).toBeNull()
    })
  })
})
