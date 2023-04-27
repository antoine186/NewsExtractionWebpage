import { api, stripeCustomerCreate } from '../backend_configuration/BackendConfig'

function StripeCustomerCreate (accountCreationData, setStripeCustomerId) {
  api.post(stripeCustomerCreate, {
    accountCreationData
  }, {
    withCredentials: true
  }
  ).then(response => {
    if (response.data.operation_success) {
      setStripeCustomerId(response.data.responsePayload)
    } else { /* empty */ }
  }
  )
}

export default StripeCustomerCreate
