import { addressLookupService } from './os-places/address-lookup-service.js'
import { buildUprnAddress, buildManualAddress } from './build-address-variables-service.js'
import { checkInterrupterJourneySessionService } from './check-interrupter-journey-session-service.js'
import { initialiseFixJourneyService } from './initialise-fix-journey-service.js'
import { validateFixDetailsService } from './validate-fix-details-service.js'
import { setFixSessionDataService } from './set-fix-session-data-service.js'
import { buildPersonalSuccessMessageService } from './personal/build-personal-fix-success-message-service.js'
import { buildBusinessSuccessMessageService } from './business/build-business-fix-success-message-service.js'
import { buildCustomerFixUpdateVariablesService } from './personal/build-customer-fix-update-variables-service.js'

export const services = {
  addressLookup: addressLookupService,
  buildUprnAddress,
  buildManualAddress,
  checkInterrupterJourneySession: checkInterrupterJourneySessionService,
  initialiseFixJourney: initialiseFixJourneyService,
  validateFixDetails: validateFixDetailsService,
  setFixSessionData: setFixSessionDataService,
  buildPersonalSuccessMessage: buildPersonalSuccessMessageService,
  buildBusinessSuccessMessage: buildBusinessSuccessMessageService,
  buildCustomerFixUpdateVariables: buildCustomerFixUpdateVariablesService
}
