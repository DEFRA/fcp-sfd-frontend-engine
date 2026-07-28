// Test framework dependencies
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Thing under test
import { updateBusinessNameMutation } from '../../../../src/mutations/business/update-business-name.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('updateBusinessNameMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateBusinessNameMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    const ast = parse(updateBusinessNameMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateBusinessName')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateBusinessNameInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateBusinessName).toBe(updateBusinessNameMutation)
  })
})
