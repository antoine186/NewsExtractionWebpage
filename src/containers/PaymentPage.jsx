import React, { Component } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CardInput from '../components/atoms/CardInput'
import { loadStripe } from '@stripe/stripe-js'
import { stripePublicKey } from '../utils/stripe_configuration/StripeConfig'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/AccountDetailsInputPageStyle'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"
import { CardElement } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/atoms/CheckoutForm'
import TopBar from '../components/molecules/TopBar'
import { basicSubscriptionPricePerMonth } from '../utils/essential_numbers_strings/PaymentNumbersStrings'
import CheckEmptyObject from '../utils/CheckEmptyObject'
import { api, getSubscriptionStatus } from '../utils/backend_configuration/BackendConfig'

class PaymentPage extends Component {
  constructor (props) {
    super(props)

    const stripePromise = loadStripe(stripePublicKey)

    this.state = {
      stripePromise,
      activeSubscription: true
    }

    this.getSubscriptionStatus()
  }

  getSubscriptionStatus () {
    if (CheckEmptyObject(this.props.stripeSubscription.stripeSubscription)) {
      this.setState({ activeSubscription: false })
    } else {
      api.post(getSubscriptionStatus, {
        stripeSubscriptionId: this.props.stripeSubscription.stripeSubscription.payload.subscription_id
      }, {
        withCredentials: true
      }
      ).then(response => {
        if (response.data.operation_success) {
          if (response.data.responsePayload.stripe_subscription_status === 'incomplete') {
            this.setState({ activeSubscription: false })
          }
        } else { /* empty */ }
      }
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
      <TopBar settingsEnabled={this.props.userSession.validated} />
        <View style={styles.container}>
          <Helmet>
            <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
          </Helmet>
          <Text style={styles.titleText}>
            Your Payment Details
          </Text>
          {(this.props.userSession.validated && !this.state.activeSubscription) &&
            <Text style={styles.titleText2}>
              You don't have an active subscription.
              Please add your payment details to get a {basicSubscriptionPricePerMonth} USD per month subscription
            </Text>
          }
          {(this.props.userSession.validated && this.state.activeSubscription) &&
            <Text style={styles.titleText2}>
            {console.log(this.props.stripeSubscription.stripeSubscription)}
              You have an active subscription.
              You can change your payment details here.
            </Text>
          }
          <br></br>
          <br></br>
          <br></br>
          {this.props.stripeSubscription.stripeSubscription.payload &&
          <View style={styles.stripeCardElement}>
            <Elements stripe={this.state.stripePromise} options={{ clientSecret: this.props.stripeSubscription.stripeSubscription.payload.client_secret }}>
              <CheckoutForm />
            </Elements>
          </View>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    stripeSubscription: state.stripeSubscription,
    userSession: state.userSession
  }
}

export default connect(mapStateToProps)(PaymentPage)
