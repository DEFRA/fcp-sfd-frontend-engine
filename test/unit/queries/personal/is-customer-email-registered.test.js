// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Thing under test
import { isCustomerEmailRegisteredQuery } from '../../../../src/queries/personal/is-customer-email-registered.js'
import { queries } from '../../../../src/queries/queries.js'

describe('isCustomerEmailRegisteredQuery', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(isCustomerEmailRegisteredQuery)).not.toThrow()
  })

  test('it contains the Query operation and the correct variable', () => {
    // Parsing the GQL query returns an Abstract Syntax Tree (ast) - a structural
    // representation of the query string - so it can be inspected and validated.
    const ast = parse(isCustomerEmailRegisteredQuery)
    const operation = ast.definitions[0]
    expect(operation.operation).toBe('query')
    expect(operation.name.value).toBe('IsCustomerEmailRegistered')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('email')
    expect(variable.type.type.name.value).toBe('String')
  })

  test('it is exposed on the queries barrel', () => {
    expect(queries.isCustomerEmailRegistered).toBe(isCustomerEmailRegisteredQuery)
  })
})
