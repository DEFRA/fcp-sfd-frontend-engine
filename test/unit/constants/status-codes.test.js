// Test framework dependencies
import { describe, test, expect } from 'vitest'

// Things under test
import {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE
} from '../../../src/constants/status-codes.js'

describe('HTTP Status Codes', () => {
  test('exports OK (200)', () => {
    expect(OK).toBe(200)
  })

  test('exports BAD_REQUEST (400)', () => {
    expect(BAD_REQUEST).toBe(400)
  })

  test('exports UNAUTHORIZED (401)', () => {
    expect(UNAUTHORIZED).toBe(401)
  })

  test('exports FORBIDDEN (403)', () => {
    expect(FORBIDDEN).toBe(403)
  })

  test('exports NOT_FOUND (404)', () => {
    expect(NOT_FOUND).toBe(404)
  })

  test('exports NO_CONTENT (204)', () => {
    expect(NO_CONTENT).toBe(204)
  })

  test('exports INTERNAL_SERVER_ERROR (500)', () => {
    expect(INTERNAL_SERVER_ERROR).toBe(500)
  })

  test('exports SERVICE_UNAVAILABLE (503)', () => {
    expect(SERVICE_UNAVAILABLE).toBe(503)
  })
})
