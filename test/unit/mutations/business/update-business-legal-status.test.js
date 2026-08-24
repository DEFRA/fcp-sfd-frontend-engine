import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'
import { updateBusinessLegalStatusMutation } from '../../../../src/mutations/business/update-business-legal-status.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('When the updateBusinessLegalStatusMutation is parsed', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateBusinessLegalStatusMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    const ast = parse(updateBusinessLegalStatusMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateBusinessLegalStatus')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateBusinessLegalStatusInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateBusinessLegalStatus).toBe(updateBusinessLegalStatusMutation)
  })
})
