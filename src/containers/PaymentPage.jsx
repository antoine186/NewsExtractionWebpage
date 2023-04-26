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

class PaymentPage extends Component {
  constructor (props) {
    super(props)

    const stripePromise = loadStripe(stripePublicKey)

    this.state = {
      stripePromise
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
          {(this.props.userSession.validated && CheckEmptyObject(this.props.stripeSubscription.stripeSubscription)) &&
            <Text style={styles.titleText}>
              You don't have an active subscription.
              Please add your payment details to get a {basicSubscriptionPricePerMonth} USD per month subscription
            </Text>
          }
          {(this.props.userSession.validated && !CheckEmptyObject(this.props.stripeSubscription.stripeSubscription)) &&
            <Text style={styles.titleText}>
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
