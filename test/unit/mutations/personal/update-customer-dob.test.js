// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Thing under test
import { updateCustomerDobMutation } from '../../../../src/mutations/personal/update-customer-dob.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('updateCustomerDobMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateCustomerDobMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    // Parsing the GQL mutation returns an Abstract Syntax Tree (ast) - a structural
    // representation of the mutation string - so it can be inspected and validated.
    const ast = parse(updateCustomerDobMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateCustomerDateOfBirth')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateCustomerDateOfBirthInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateCustomerDob).toBe(updateCustomerDobMutation)
  })
})
