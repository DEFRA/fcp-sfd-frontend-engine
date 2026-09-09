import { buildManualAddress, buildUprnAddress } from './build-address-variables-service.js'
import { buildFixSuccessMessageService } from './build-fix-success-message-service.js'
import { buildBusinessFixUpdateVariablesService } from './business/build-business-fix-update-variables-service.js'
import { checkInterrupterJourneySessionService } from './check-interrupter-journey-session-service.js'
import { initialiseFixJourneyService } from './initialise-fix-journey-service.js'
import { addressLookupService } from './os-places/address-lookup-service.js'
import { buildCustomerFixUpdateVariablesService } from './personal/build-customer-fix-update-variables-service.js'
import { setFixSessionDataService } from './set-fix-session-data-service.js'
import { validateFixDetailsService } from './validate-fix-details-service.js'

export const services = {
  addressLookup: addressLookupService,
  buildBusinessFixUpdateVariables: buildBusinessFixUpdateVariablesService,
  buildCustomerFixUpdateVariables: buildCustomerFixUpdateVariablesService,
  buildFixSuccessMessage: buildFixSuccessMessageService,
  buildManualAddress,
  buildUprnAddress,
  checkInterrupterJourneySession: checkInterrupterJourneySessionService,
  initialiseFixJourney: initialiseFixJourneyService,
  setFixSessionData: setFixSessionDataService,
  validateFixDetails: validateFixDetailsService
}
