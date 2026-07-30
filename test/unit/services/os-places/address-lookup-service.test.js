// Test framework dependencies
import { vi, describe, test, expect, beforeEach } from 'vitest'

const mockAddressLookupMapper = vi.fn()
const mockPlacesAPIPostcode = vi.fn()
const mockMockPostcode = vi.fn()

// Mocks
vi.mock('../../../../src/mappers/address-lookup-mapper.js', () => ({
  addressLookupMapper: mockAddressLookupMapper
}))

vi.mock('osdatahub', () => ({
  placesAPI: {
    postcode: mockPlacesAPIPostcode
  }
}))

vi.mock('../../../../src/services/os-places/os-places-stub.js', () => ({
  mockPostcode: mockMockPostcode
}))

// Thing under test
const { addressLookupService } = await import('../../../../src/services/os-places/address-lookup-service.js')

describe('addressLookupService (engine)', () => {
  const postcode = 'SW1A 1AA'
  const mockAddresses = mockData()
  const mappedMockAddresses = mappedMockData()
  const osPlacesConfig = {
    clientId: 'fake-client-id',
    osPlacesStub: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when osPlacesStub is not enabled', () => {
    beforeEach(() => {
      mockAddressLookupMapper.mockReturnValue(mappedMockAddresses)
    })

    describe('when called with a valid postcode', () => {
      beforeEach(() => {
        mockPlacesAPIPostcode.mockResolvedValue(mockAddresses)
      })

      test('returns mapped addresses', async () => {
        const result = await addressLookupService(postcode, osPlacesConfig)

        expect(result).toEqual(mappedMockAddresses)
        expect(mockAddressLookupMapper).toHaveBeenCalledWith(mockAddresses.features)
      })
    })

    describe('when called with a postcode that returns no addresses', () => {
      beforeEach(() => {
        mockPlacesAPIPostcode.mockResolvedValue({ features: [] })
      })

      test('returns a Joi-like error object', async () => {
        const result = await addressLookupService(postcode, osPlacesConfig)

        expect(result).toEqual({
          error: [
            {
              message: 'No addresses found for this postcode',
              path: ['postcode']
            }
          ]
        })
        expect(mockAddressLookupMapper).not.toHaveBeenCalled()
      })
    })

    describe('when the API errors', () => {
      let error

      beforeEach(() => {
        error = new Error('Network error')
        mockPlacesAPIPostcode.mockRejectedValue(error)
      })

      test('returns error object', async () => {
        const result = await addressLookupService(postcode, osPlacesConfig)

        expect(result).toEqual({
          error: [
            {
              message: 'Network error',
              path: ['postcode']
            }
          ]
        })
        expect(mockAddressLookupMapper).not.toHaveBeenCalled()
      })
    })

    describe('retry logic for transient errors', () => {
      beforeEach(() => {
        mockAddressLookupMapper.mockReturnValue(mappedMockAddresses)
      })

      describe('when retrying on ECONNRESET', () => {
        beforeEach(() => {
          const transientError = new Error('Connection reset')
          transientError.code = 'ECONNRESET'
          mockPlacesAPIPostcode
            .mockRejectedValueOnce(transientError)
            .mockRejectedValueOnce(transientError)
            .mockResolvedValueOnce(mockData())
        })

        test('retries and eventually succeeds', async () => {
          const result = await addressLookupService(postcode, osPlacesConfig)

          expect(result).toEqual(mappedMockAddresses)
          expect(mockPlacesAPIPostcode).toHaveBeenCalledTimes(3)
        })
      })

      describe('when retrying on ECONNREFUSED', () => {
        beforeEach(() => {
          const transientError = new Error('Connection refused')
          transientError.code = 'ECONNREFUSED'
          mockPlacesAPIPostcode
            .mockRejectedValueOnce(transientError)
            .mockResolvedValueOnce(mockData())
        })

        test('retries and eventually succeeds', async () => {
          const result = await addressLookupService(postcode, osPlacesConfig)

          expect(result).toEqual(mappedMockAddresses)
          expect(mockPlacesAPIPostcode).toHaveBeenCalledTimes(2)
        })
      })

      describe('when retrying on ETIMEDOUT', () => {
        beforeEach(() => {
          const transientError = new Error('Connection timeout')
          transientError.code = 'ETIMEDOUT'
          mockPlacesAPIPostcode
            .mockRejectedValueOnce(transientError)
            .mockResolvedValueOnce(mockData())
        })

        test('retries and eventually succeeds', async () => {
          const result = await addressLookupService(postcode, osPlacesConfig)

          expect(result).toEqual(mappedMockAddresses)
          expect(mockPlacesAPIPostcode).toHaveBeenCalledTimes(2)
        })
      })

      describe('when retrying on 5xx server errors', () => {
        beforeEach(() => {
          const serverError = new Error('Service unavailable')
          serverError.status = 503
          mockPlacesAPIPostcode
            .mockRejectedValueOnce(serverError)
            .mockResolvedValueOnce(mockData())
        })

        test('retries and eventually succeeds', async () => {
          const result = await addressLookupService(postcode, osPlacesConfig)

          expect(result).toEqual(mappedMockAddresses)
          expect(mockPlacesAPIPostcode).toHaveBeenCalledTimes(2)
        })
      })

      describe('when given a permanent error (4xx)', () => {
        beforeEach(() => {
          const permanentError = new Error('Bad request')
          permanentError.status = 400
          mockPlacesAPIPostcode.mockRejectedValue(permanentError)
        })

        test('does not retry and returns error immediately', async () => {
          const result = await addressLookupService(postcode, osPlacesConfig)

          expect(result).toEqual({
            error: [
              {
                message: 'Bad request',
                path: ['postcode']
              }
            ]
          })
          expect(mockPlacesAPIPostcode).toHaveBeenCalledTimes(1)
        })
      })

      describe('when max retries exhausted on transient errors', () => {
        beforeEach(() => {
          const transientError = new Error('Connection reset')
          transientError.code = 'ECONNRESET'
          mockPlacesAPIPostcode.mockRejectedValue(transientError)
        })

        test('returns error after 3 attempts', async () => {
          const result = await addressLookupService(postcode, osPlacesConfig)

          expect(result).toEqual({
            error: [
              {
                message: 'Connection reset',
                path: ['postcode']
              }
            ]
          })
          expect(mockPlacesAPIPostcode).toHaveBeenCalledTimes(3)
        })
      })
    })
  })

  describe('when osPlacesStub is enabled', () => {
    const stubConfig = { ...osPlacesConfig, osPlacesStub: true }

    beforeEach(() => {
      mockMockPostcode.mockReturnValue(mockData())
      mockAddressLookupMapper.mockReturnValue(mappedMockAddresses)
    })

    describe('when called with a valid postcode', () => {
      test('calls mockPostcode instead of the real API and returns mapped results', async () => {
        const result = await addressLookupService(postcode, stubConfig)

        expect(mockMockPostcode).toHaveBeenCalledWith(postcode)
        expect(mockPlacesAPIPostcode).not.toHaveBeenCalled()
        expect(mockAddressLookupMapper).toHaveBeenCalledWith(mockData().features)
        expect(result).toEqual(mappedMockAddresses)
      })
    })
  })
})

const mappedMockData = () => {
  return [
    {
      displayAddress: '123 Test Street, LONDON, E1 6AN',
      buildingName: 'Test Organisation',
      flatName: null,
      buildingNumberRange: '123',
      street: 'Test Street',
      dependentLocality: 'London Borough of Tower Hamlets',
      doubleDependentLocality: 'London Borough of Tower Hamlets',
      city: 'LONDON',
      county: 'CITY OF LONDON',
      postcode: 'E1 6AN',
      country: 'ENGLAND',
      uprn: '1001'
    }
  ]
}

const mockData = () => {
  return {
    features: [
      {
        properties: {
          UPRN: '1001',
          ADDRESS: '123 Test Street, LONDON, E1 6AN',
          ORGANISATION_NAME: 'Test Organisation',
          BUILDING_NUMBER: '123',
          THOROUGHFARE_NAME: 'Test Street',
          DOUBLE_DEPENDENT_LOCALITY: 'London Borough of Tower Hamlets',
          DEPENDENT_LOCALITY: 'London Borough of Tower Hamlets',
          POST_TOWN: 'LONDON',
          POSTCODE: 'E1 6AN',
          LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF LONDON',
          COUNTRY_CODE: 'E'
        }
      }
    ]
  }
}
