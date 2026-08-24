import { parse } from 'graphql'
import { describe, test, expect } from 'vitest'
import { updateBusinessRegistrationNumbersMutation } from '../../../../src/mutations/business/update-business-registration-numbers.js'
import { mutations } from '../../../../src/mutations/mutations.js'

describe('When the updateBusinessRegistrationNumbersMutation is parsed', () => {
  test('it is valid GraphQL syntax', () => {
    expect(() => parse(updateBusinessRegistrationNumbersMutation)).not.toThrow()
  })

  test('it contains the Mutation operation and the correct variable', () => {
    const ast = parse(updateBusinessRegistrationNumbersMutation)
    const operation = ast.definitions[0]
    expect(operation.name.value).toBe('UpdateBusinessRegistrationNumbers')

    const variable = operation.variableDefinitions[0]
    expect(variable.variable.name.value).toBe('input')
    expect(variable.type.type.name.value).toBe('UpdateBusinessRegistrationNumbersInput')
  })

  test('it is exposed on the mutations barrel', () => {
    expect(mutations.updateBusinessRegistrationNumbers).toBe(updateBusinessRegistrationNumbersMutation)
  })
})
