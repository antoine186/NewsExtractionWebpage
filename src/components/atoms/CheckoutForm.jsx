import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { api, storeNewSubscription } from '../../utils/backend_configuration/BackendConfig'
import { setValidSubscription } from '../../store/Slices/ValidSubscriptionSlice'
import { useDispatch } from 'react-redux'

export default function CheckoutForm (props) {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const accountData = useSelector(state => state.accountData)
  const stripeSubscription = useSelector(state => state.stripeSubscription)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}#/completion`
      }
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    api.post(storeNewSubscription, {
      emailAddress: accountData.emailAddress,
      stripeSubscriptionId: stripeSubscription.stripe_subscription_id,
      subscriptionStatus: 'active'
    }, {
      withCredentials: true
    }
    )

    dispatch(setValidSubscription(true))

    setIsProcessing(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? 'Processing ... ' : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
