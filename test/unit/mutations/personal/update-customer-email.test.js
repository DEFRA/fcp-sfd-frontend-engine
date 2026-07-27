// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Thing under test
import { updateCustomerEmailMutation } from '../../../../src/mutations/personal/update-customer-email.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('updateCustomerEmailMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateCustomerEmailMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    // Parsing the GQL mutation returns an Abstract Syntax Tree (ast) - a structural
    // representation of the mutation string - so it can be inspected and validated.
    const ast = parse(updateCustomerEmailMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateCustomerEmail')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateCustomerEmailInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateCustomerEmail).toBe(updateCustomerEmailMutation)
  })
})
