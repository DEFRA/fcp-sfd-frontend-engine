// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Thing under test
import { updateBusinessDetailsMutation } from '../../../../src/mutations/business/update-business-details.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('updateBusinessDetailsMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateBusinessDetailsMutation)).not.toThrow()
  })

  test('it contains the UpdateBusinessAllFields operation and the correct variable', () => {
    // Parsing the GQL mutation returns an Abstract Syntax Tree (ast) - a structural
    // representation of the mutation string - so it can be inspected and validated.
    const ast = parse(updateBusinessDetailsMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateBusinessAllFields')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateBusinessAllFieldsInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateBusinessDetails).toBe(updateBusinessDetailsMutation)
  })
})
