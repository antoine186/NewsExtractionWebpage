import { api, stripeCustomerCreate, subscriptionCreate } from '../backend_configuration/BackendConfig'
import { basicSubscriptionPriceId } from '../stripe_configuration/StripeConfig'

function StripeCustomerCreate (accountCreationData, setStripeCustomerId, setstripeSubscription) {
  api.post(stripeCustomerCreate, {
    accountCreationData
  }, {
    withCredentials: true
  }
  ).then(response => {
    if (response.data.operation_success) {
      setStripeCustomerId(response.data.responsePayload.stripe_customer_id)

      api.post(subscriptionCreate, {
        priceId: basicSubscriptionPriceId,
        stripeCustomerId: response.data.responsePayload.stripe_customer_id,
        emailAddress: accountCreationData.payload.emailAddress
      }, {
        withCredentials: true
      }
      ).then(response => {
        if (response.data.operation_success) {
          console.log(response.data.responsePayload)
          setstripeSubscription(response.data.responsePayload)
        } else { /* empty */ }
      }
      )
    } else { /* empty */ }
  }
  )
}

export default StripeCustomerCreate
