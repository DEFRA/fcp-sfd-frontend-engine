// Test framework dependencies
import { describe, test, expect, beforeEach, vi } from 'vitest'

// Thing under test
import { setFixSessionDataService } from '../../../src/services/set-fix-session-data-service.js'

describe('setFixSessionDataService', () => {
  let yar
  let sessionData
  let payload

  beforeEach(() => {
    vi.clearAllMocks()

    yar = {
      set: vi.fn()
    }
  })

  describe('when handling personal details', () => {
    beforeEach(() => {
      sessionData = {
        orderedSectionsToFix: ['name', 'email']
      }

      payload = {
        first: 'John',
        last: 'Doe',
        personalEmail: 'john.doe@example.com'
      }
    })

    test('maps payload fields into fix updates based on section order', () => {
      setFixSessionDataService(
        yar,
        sessionData,
        payload,
        sessionData.orderedSectionsToFix,
        'personalDetailsValidation',
        'personalFixUpdates'
      )

      expect(sessionData.personalFixUpdates).toEqual({
        name: {
          first: 'John',
          middle: '',
          last: 'Doe'
        },
        email: {
          personalEmail: 'john.doe@example.com'
        }
      })
    })

    test('defaults missing payload fields to empty strings', () => {
      payload = {
        first: 'John'
      }

      setFixSessionDataService(
        yar,
        sessionData,
        payload,
        sessionData.orderedSectionsToFix,
        'personalDetailsValidation',
        'personalFixUpdates'
      )

      expect(sessionData.personalFixUpdates).toEqual({
        name: {
          first: 'John',
          middle: '',
          last: ''
        },
        email: {
          personalEmail: ''
        }
      })
    })

    test('stores the updated session data using yar.set', () => {
      setFixSessionDataService(
        yar,
        sessionData,
        payload,
        sessionData.orderedSectionsToFix,
        'personalDetailsValidation',
        'personalFixUpdates'
      )

      expect(yar.set).toHaveBeenCalledWith(
        'personalDetailsValidation',
        sessionData
      )
    })
  })

  describe('when handling business details', () => {
    beforeEach(() => {
      sessionData = {
        orderedSectionsToFix: ['name', 'email']
      }

      payload = {
        businessName: 'New Business Name',
        businessEmail: 'john.doe@example.com'
      }
    })

    test('maps payload fields into fix updates based on section order', () => {
      setFixSessionDataService(
        yar,
        sessionData,
        payload,
        sessionData.orderedSectionsToFix,
        'businessDetailsValidation',
        'businessFixUpdates'
      )

      expect(sessionData.businessFixUpdates).toEqual({
        name: {
          businessName: 'New Business Name'
        },
        email: {
          businessEmail: 'john.doe@example.com'
        }
      })
    })

    test('defaults missing payload fields to empty strings', () => {
      payload = {
        businessName: 'New Business Name'
      }

      setFixSessionDataService(
        yar,
        sessionData,
        payload,
        sessionData.orderedSectionsToFix,
        'businessDetailsValidation',
        'businessFixUpdates'
      )

      expect(sessionData.businessFixUpdates).toEqual({
        name: {
          businessName: 'New Business Name'
        },
        email: {
          businessEmail: ''
        }
      })
    })

    test('stores the updated session data using yar.set', () => {
      setFixSessionDataService(
        yar,
        sessionData,
        payload,
        sessionData.orderedSectionsToFix,
        'businessDetailsValidation',
        'businessFixUpdates'
      )

      expect(yar.set).toHaveBeenCalledWith(
        'businessDetailsValidation',
        sessionData
      )
    })
  })
})
