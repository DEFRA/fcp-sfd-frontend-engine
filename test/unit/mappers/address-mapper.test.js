// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
const { mapAddress } = await import('../../../src/mappers/address-mapper.js')

describe('mapAddress', () => {
  let dalData

  beforeEach(() => {
    dalData = {
      business: {
        info: {
          address: {
            pafOrganisationName: 'Corp ltd',
            buildingNumberRange: '7',
            buildingName: 'STOCKWELL HALL',
            flatName: 'THE COACH HOUSE',
            street: 'HAREWOOD AVENUE',
            city: 'DARLINGTON',
            county: 'Dorset',
            postalCode: 'CO9 3LS',
            uprn: '12345',
            country: 'United Kingdom',
            dependentLocality: 'ELLICOMBE',
            doubleDependentLocality: 'WOODTHORPE',
            line1: null,
            line2: null,
            line3: null,
            line4: null,
            line5: null
          }
        }
      }
    }
  })

  describe('when given valid raw DAL data', () => {
    describe('full mapping', () => {
      test('it should map the values to the correct format', () => {
        const result = mapAddress(dalData.business.info.address)

        expect(result).toEqual({
          address: {
            lookup: {
              pafOrganisationName: 'Corp ltd',
              flatName: 'THE COACH HOUSE',
              buildingNumberRange: '7',
              buildingName: 'STOCKWELL HALL',
              dependentLocality: 'ELLICOMBE',
              doubleDependentLocality: 'WOODTHORPE',
              street: 'HAREWOOD AVENUE',
              county: 'Dorset',
              uprn: '12345'
            },
            manual: {
              line1: null,
              line2: null,
              line3: null,
              line4: null,
              line5: null
            },
            city: 'DARLINGTON',
            postcode: 'CO9 3LS',
            country: 'United Kingdom'
          }
        })
      })
    })
  })

  describe('when given no data', () => {
    test('it should return an empty address object', () => {
      const result = mapAddress()

      expect(result).toEqual({
        address: {
          lookup: {
            pafOrganisationName: undefined,
            flatName: undefined,
            buildingNumberRange: undefined,
            buildingName: undefined,
            dependentLocality: undefined,
            doubleDependentLocality: undefined,
            street: undefined,
            county: undefined,
            uprn: undefined
          },
          manual: {
            line1: undefined,
            line2: undefined,
            line3: undefined,
            line4: undefined,
            line5: undefined
          },
          city: undefined,
          postcode: undefined,
          country: undefined
        }
      })
    })
  })
})
