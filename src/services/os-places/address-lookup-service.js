/**
 * Service to fetch and map addresses from the OS Places API based on a UK postcode.
 *
 * The service:
 * - Calls the OS Places API via the official `osdatahub` package to search for addresses for a given postcode
 * - Maps the returned address properties into a format suitable for front-end display and for updating via the DAL.
 *
 * @module addressLookupService
 */

import { placesAPI } from 'osdatahub'
import { addressLookupMapper } from '../../mappers/address-lookup-mapper.js'
import { mockPostcode } from './os-places-stub.js'

/**
 * Fetch and map addresses from OS Places API based on postcode.
 *
 * @param {string} postcode - The UK postcode to search for
 * @param {object} osPlacesConfig - OS Places configuration object
 * @param {string} osPlacesConfig.clientId - OS Places API client ID
 * @param {boolean} osPlacesConfig.osPlacesStub - Whether to use mock data
 * @returns {Promise<Array|object>} Array of addresses or error object
 */
const addressLookupService = async (postcode, osPlacesConfig) => {
  const addresses = await fetchAddressesFromPostcodeLookup(postcode, osPlacesConfig)

  // If the API call itself failed, return the error object
  if (addresses.error) {
    return addresses
  }

  // If the API returned successfully but found no addresses for the postcode
  if (!addresses?.length) {
    // Create a Joi-like error object to indicate that the postcode lookup returned no addresses
    return {
      error: [
        {
          message: 'No addresses found for this postcode',
          path: ['postcode']
        }
      ]
    }
  }

  // Map the raw API response into a format suitable for the front-end
  const mappedAddresses = addressLookupMapper(addresses)

  return mappedAddresses
}

/**
 * Fetch addresses from the OS Places API or mock data based on configuration.
 *
 * Implements:
 * - Retry logic (3 attempts) for transient errors (network timeouts, 5xx server errors)
 * - Exponential backoff between retries (100ms, 200ms, 400ms)
 * - Standard error formatting for all failures
 *
 * Note: The osdatahub package does not currently support request timeouts.
 * If API calls hang indefinitely, they will eventually fail after 3 retry attempts.
 *
 * @private
 * @param {string} postcode - The UK postcode to search for
 * @param {object} osPlacesConfig - Configuration object containing clientId and osPlacesStub flag
 * @returns {Promise<Array|object>} Array of address features or error object with error property
 */
const fetchAddressesFromPostcodeLookup = async (postcode, osPlacesConfig) => {
  const MAX_RETRIES = 3
  const INITIAL_BACKOFF_MS = 100

  for (let attemptNumber = 1; attemptNumber <= MAX_RETRIES; attemptNumber++) {
    try {
      const { clientId, osPlacesStub } = osPlacesConfig

      // Use mock data for testing if enabled, otherwise call the real OS Places API
      const response = osPlacesStub
        ? mockPostcode(postcode)
        : await fetchFromPlacesAPI(clientId, postcode)

      return response.features ?? []
    } catch (error) {
      const shouldRetry = isRetryable(error) && (attemptNumber < MAX_RETRIES)

      if (!shouldRetry) {
        // Either error is permanent, or this was our last attempt
        return buildErrorResponse(error.message)
      }

      // Wait before retrying with exponential backoff (gives the API time to recover)
      const backoffMs = calculateExponentialBackoff(attemptNumber, INITIAL_BACKOFF_MS)
      await delayBeforeRetry(backoffMs)
    }
  }
}

/**
 * Calculate exponential backoff duration.
 * Attempts: 1, 2, 3 → Wait: 100ms, 200ms, 400ms
 *
 * Example: attempt 2 with 100ms base
 * - exponent = 2 - 1 = 1
 * - powerOf2 = 2^1 = 2
 * - backoff = 100 * 2 = 200ms
 *
 * @private
 * @param {number} attemptNumber - Current attempt (1-indexed)
 * @param {number} baseMs - Initial backoff in milliseconds
 * @returns {number} Milliseconds to wait before next retry
 */
const calculateExponentialBackoff = (attemptNumber, baseMs) => {
  const exponent = attemptNumber - 1
  const powerOf2 = Math.pow(2, exponent)
  const backoffDuration = baseMs * powerOf2
  return backoffDuration
}

/**
 * Delay before retrying (allows time for API to recover from transient errors).
 *
 * @private
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
function delayBeforeRetry (ms) {
  const callback = (resolve) => {
    setTimeout(resolve, ms)
  }

  return new Promise(callback)
}

/**
 * Build a standard error response object.
 *
 * @private
 * @param {string} message - Error message
 * @returns {object} Joi-like error object
 */
const buildErrorResponse = (message) => {
  return {
    error: [
      {
        message: message || 'Failed to fetch addresses',
        path: ['postcode']
      }
    ]
  }
}

/**
 * Fetch from the OS Places API.
 *
 * @private
 * @param {string} clientId - OS Places API client ID
 * @param {string} postcode - The UK postcode to search for
 * @returns {Promise<object>} API response
 * @throws {Error} If API returns an error
 */
const fetchFromPlacesAPI = async (clientId, postcode) => {
  const response = await placesAPI.postcode(clientId, postcode, { limit: 150 })

  return response
}

/**
 * Determine if an error is transient (temporary) and should trigger a retry.
 *
 * Transient errors include:
 * - Network errors: ECONNRESET, ECONNREFUSED, ETIMEDOUT
 * - Server errors: 5xx status codes (API is temporarily down)
 *
 * Permanent errors (should NOT retry):
 * - Client errors: 4xx status codes (bad input, auth failure)
 * - Logic errors (bad API key, invalid postcode format)
 *
 * @private
 * @param {Error} error - The error to check
 * @returns {boolean} True if error is transient and we should retry
 */
const isRetryable = (error) => {
  // Network-level transient errors (temporary connection problems)
  const networkErrors = ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT']
  if (networkErrors.includes(error.code)) {
    return true
  }

  // Server error (5xx status codes mean the API is temporarily unavailable)
  if (error.status && error.status >= 500) {
    return true
  }

  // All other errors are permanent (bad input, auth failure, etc.)
  return false
}

export {
  addressLookupService
}
