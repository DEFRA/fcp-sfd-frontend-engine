// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Thing under test
import { updateCustomerNameMutation } from '../../../../src/mutations/personal/update-customer-name.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('updateCustomerNameMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateCustomerNameMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    // Parsing the GQL mutation returns an Abstract Syntax Tree (ast) - a structural
    // representation of the mutation string - so it can be inspected and validated.
    const ast = parse(updateCustomerNameMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateCustomerName')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateCustomerNameInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateCustomerName).toBe(updateCustomerNameMutation)
  })
})
