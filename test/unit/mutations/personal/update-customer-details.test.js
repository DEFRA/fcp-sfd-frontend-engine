// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Thing under test
import { updateCustomerDetailsMutation } from '../../../../src/mutations/personal/update-customer-details.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('updateCustomerDetailsMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateCustomerDetailsMutation)).not.toThrow()
  })

  test('it contains the UpdateCustomerAllFields operation and the correct variable', () => {
    // Parsing the GQL mutation returns an Abstract Syntax Tree (ast) - a structural
    // representation of the mutation string - so it can be inspected and validated.
    const ast = parse(updateCustomerDetailsMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateCustomerAllFields')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateCustomerAllFieldsInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateCustomerDetails).toBe(updateCustomerDetailsMutation)
  })
})
