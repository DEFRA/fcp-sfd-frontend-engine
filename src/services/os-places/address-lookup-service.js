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
import { constants } from '../../constants/index.js'
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
  if (addresses.errors) {
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
 * Handles the API call and catches any errors, wrapping them in a standard error object.
 * If osPlacesStub is enabled in config, uses mock data instead of making a real API call.
 *
 * @private
 * @param {string} postcode - The UK postcode to search for
 * @param {object} osPlacesConfig - Configuration object containing clientId and osPlacesStub flag
 * @returns {Promise<Array|object>} Array of address features or error object with errors property
 */
const fetchAddressesFromPostcodeLookup = async (postcode, osPlacesConfig) => {
  try {
    const { clientId, osPlacesStub } = osPlacesConfig

    // Use mock data for testing if enabled, otherwise call the real OS Places API
    const response = osPlacesStub
      ? mockPostcode(postcode)
      : await placesAPI.postcode(clientId, postcode, { limit: 150 })

    return response.features ?? []
  } catch (error) {
    // Return error in a standard format for the caller to handle
    return {
      statusCode: constants.statusCodes.INTERNAL_SERVER_ERROR,
      errors: [error]
    }
  }
}

export {
  addressLookupService
}
