// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
const { mapPersonalBusinessDetails } = await import('../../../src/mappers/personal-business-details-mapper.js')

describe('personalBusinessDetailsMapper', () => {
  let dalData

  beforeEach(() => {
    dalData = {
      customer: {
        info: {
          name: {
            first: 'John',
            middle: 'M',
            last: 'Doe'
          }
        }
      },
      business: {
        sbi: '123456789',
        organisationId: '5565448',
        info: {
          name: 'Acme Farms Ltd'
        }
      }
    }
  })

  describe('when given valid raw DAL data', () => {
    describe('full mapping', () => {
      test('it should map the values to the correct format', () => {
        const result = mapPersonalBusinessDetails(dalData)

        expect(result).toEqual({
          info: {
            userName: 'John Doe'
          },
          business: {
            info: {
              name: 'Acme Farms Ltd',
              organisationId: '5565448',
              sbi: '123456789'
            }
          }
        })
      })
    })

    describe('info.userName', () => {
      beforeEach(() => {
        dalData.customer.info.name.middle = null
        dalData.customer.info.name.first = 'Software'
        dalData.customer.info.name.last = 'Developer'
      })

      test('it should build the userName correctly', () => {
        const result = mapPersonalBusinessDetails(dalData)

        expect(result.info.userName).toEqual('Software Developer')
      })
    })
  })
})
