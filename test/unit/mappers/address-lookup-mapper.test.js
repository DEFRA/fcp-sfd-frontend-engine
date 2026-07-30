// Test framework dependencies
import { vi, describe, test, expect } from 'vitest'

// Thing under test
import { addressLookupMapper } from '../../../src/mappers/address-lookup-mapper.js'

// Mocks
vi.mock('../../../src/schemas/schemas.js', () => ({
  schemas: {
    osPlaces: {
      addressLookup: {
        validate: vi.fn().mockReturnValue({ error: null })
      }
    }
  }
}))

describe('addressLookupMapper', () => {
  test('maps OS Places API response to display format', () => {
    const addresses = mockData()
    const result = addressLookupMapper(addresses.features)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      displayAddress: '123 Test Street, LONDON, E1 6AN',
      pafOrganisationName: 'Test Organisation',
      flatName: null,
      buildingName: 'Test Building',
      buildingNumberRange: '123',
      street: 'Test Street',
      dependentLocality: 'London Borough of Tower Hamlets',
      doubleDependentLocality: 'London Borough of Tower Hamlets',
      city: 'LONDON',
      county: 'CITY OF LONDON',
      postcode: 'E1 6AN',
      country: 'ENGLAND',
      uprn: '1001'
    })
  })

  test('filters out invalid addresses that fail schema validation', async () => {
    const { schemas } = await import('../../../src/index.js')
    schemas.osPlaces.addressLookup.validate.mockReturnValueOnce({ error: 'Invalid' })

    const addresses = mockData()
    const result = addressLookupMapper(addresses.features)

    // Should filter out invalid addresses
    expect(result).toHaveLength(0)
  })

  test('handles PO BOX addresses', () => {
    const addresses = {
      features: [
        {
          properties: {
            UPRN: '2001',
            ADDRESS: 'PO BOX 123, LONDON, E1 6AN',
            PO_BOX_NUMBER: '123',
            ORGANISATION_NAME: 'Test Org',
            BUILDING_NUMBER: null,
            THOROUGHFARE_NAME: 'Test Street',
            DOUBLE_DEPENDENT_LOCALITY: 'Westminster',
            DEPENDENT_LOCALITY: 'Westminster',
            POST_TOWN: 'LONDON',
            POSTCODE: 'E1 6AN',
            LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF LONDON',
            COUNTRY_CODE: 'E'
          }
        }
      ]
    }

    const result = addressLookupMapper(addresses.features)

    expect(result[0].buildingName).toBe('PO BOX 123')
  })

  test('filters out ORDNANCE SURVEY county descriptions', () => {
    const addresses = {
      features: [
        {
          properties: {
            UPRN: '3001',
            ADDRESS: 'Test Address',
            ORGANISATION_NAME: 'Test Org',
            BUILDING_NUMBER: '1',
            THOROUGHFARE_NAME: 'Test Street',
            DOUBLE_DEPENDENT_LOCALITY: 'Area',
            DEPENDENT_LOCALITY: 'Area',
            POST_TOWN: 'LONDON',
            POSTCODE: 'E1 6AN',
            LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'ORDNANCE SURVEY',
            COUNTRY_CODE: 'E'
          }
        }
      ]
    }

    const result = addressLookupMapper(addresses.features)

    expect(result[0].county).toBeNull()
  })

  test('filters out post town when it matches county description', () => {
    const addresses = {
      features: [
        {
          properties: {
            UPRN: '4001',
            ADDRESS: 'Test Address',
            ORGANISATION_NAME: 'Test Org',
            BUILDING_NUMBER: '1',
            THOROUGHFARE_NAME: 'Test Street',
            DOUBLE_DEPENDENT_LOCALITY: 'Area',
            DEPENDENT_LOCALITY: 'Area',
            POST_TOWN: 'LONDON',
            POSTCODE: 'E1 6AN',
            LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'LONDON',
            COUNTRY_CODE: 'E'
          }
        }
      ]
    }

    const result = addressLookupMapper(addresses.features)

    expect(result[0].county).toBeNull()
  })

  describe('defensive guard against invalid input', () => {
    test('returns empty array when addresses is null', () => {
      const result = addressLookupMapper(null)

      expect(result).toEqual([])
    })

    test('returns empty array when addresses is undefined', () => {
      const result = addressLookupMapper(undefined)

      expect(result).toEqual([])
    })

    test('returns empty array when addresses is not an array', () => {
      const result = addressLookupMapper({ features: [] })

      expect(result).toEqual([])
    })

    test('returns empty array when addresses is a string', () => {
      const result = addressLookupMapper('not an array')

      expect(result).toEqual([])
    })

    test('returns empty array when addresses is a number', () => {
      const result = addressLookupMapper(123)

      expect(result).toEqual([])
    })
  })
})

const mockData = () => {
  return {
    features: [
      {
        properties: {
          UPRN: '1001',
          ADDRESS: '123 Test Street, LONDON, E1 6AN',
          ORGANISATION_NAME: 'Test Organisation',
          BUILDING_NUMBER: '123',
          BUILDING_NAME: 'Test Building',
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
