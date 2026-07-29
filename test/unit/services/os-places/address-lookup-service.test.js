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

      describe('when called with a valid postcode', () => {
        test('returns mapped addresses', async () => {
          const result = await addressLookupService(postcode, osPlacesConfig)

          expect(result).toEqual(mappedMockAddresses)
          expect(mockAddressLookupMapper).toHaveBeenCalledWith(mockAddresses.features)
        })
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
          statusCode: 500,
          errors: [error]
        })
        expect(mockAddressLookupMapper).not.toHaveBeenCalled()
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
