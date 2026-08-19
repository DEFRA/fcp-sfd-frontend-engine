// Test frameworks
import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'

// Things under test
import { updateBusinessVatMutation } from '../../../../src/mutations/business/update-business-vat.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('updateBusinessVatMutation', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateBusinessVatMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    const ast = parse(updateBusinessVatMutation)
    const operation = ast.definitions[0]

    expect(operation.name.value).toBe('UpdateBusinessVAT')

    const variable = operation.variableDefinitions[0]

    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateBusinessVATInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateBusinessVat).toBe(updateBusinessVatMutation)
  })
})
