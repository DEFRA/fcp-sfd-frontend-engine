// Test framework dependencies
import { describe, test, expect, beforeEach } from 'vitest'

// Thing under test
const { mapCustomerName } = await import('../../../src/mappers/customer-name-mapper.js')

describe('mapCustomerName', () => {
  let dalData

  beforeEach(() => {
    dalData = {
      customer: {
        name: {
          first: 'John',
          last: 'Smith'
        }
      }
    }
  })

  describe('when given valid raw DAL data', () => {
    describe('full mapping', () => {
      test('it should map the values to the correct format', () => {
        const result = mapCustomerName(dalData.customer.name)

        expect(result).toEqual({
          customer: {
            userName: 'John Smith'
          }
        })
      })
    })
  })

  describe('when given no data', () => {
    test('it should return an empty userName', () => {
      const result = mapCustomerName()
      expect(result).toEqual({
        customer: {
          userName: ''
        }
      })
    })
  })
})
