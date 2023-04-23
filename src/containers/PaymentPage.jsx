import React, { Component } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CardInput from '../components/atoms/CardInput'
import { loadStripe } from '@stripe/stripe-js'
import { testStripePublicKey } from '../utils/stripe_configuration/StripeConfig'

class PaymentPage extends Component {
  constructor (props) {
    super(props)

    const stripePromise = loadStripe(testStripePublicKey)

    this.state = {
      stripePromise
    }
  }

  render () {
    return (
        <Elements stripe={this.state.stripePromise}>
            <CardInput />
        </Elements>
    )
  }
}

export default PaymentPage
