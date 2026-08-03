// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Things under test
import { updateBusinessPhoneNumbersMutation } from '../../../../src/mutations/business/update-business-phone-numbers.js'
import { mutations } from '../../../../src/mutations/mutations.js'
import { updateBusinessNameMutation } from '../../../../src/mutations/business/update-business-name.js'

describe('updateBusinessPhoneNumbersMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateBusinessPhoneNumbersMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    const ast = parse(updateBusinessPhoneNumbersMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateBusinessPhoneNumbers')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateBusinessPhoneInput')
  })

  test('it is exposed on the mutation barrel', () => {
    expect(mutations.updateBusinessPhoneNumbers).toBe(updateBusinessPhoneNumbersMutation)
  })
})
