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

class PaymentPage extends Component {
  constructor (props) {
    super(props)

    // console.log(this.props.stripeSubscription)

    const stripePromise = loadStripe(stripePublicKey)
    // const stripe = Stripe(stripePublicKey)

    const options = {
      clientSecret: this.props.stripeSubscription.client_secret,
      // Fully customizable with appearance API.
      appearance: {/*...*/}
    }
    //const elements = stripePromise.elements(options)

    this.state = {
      stripePromise,
      // stripe,
      //elements
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Helmet>
          <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <Text style={styles.titleText}>
          Your Payment Details
        </Text>
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
    )
  }
}

const mapStateToProps = state => {
  return {
    stripeSubscription: state.stripeSubscription
  }
}

export default connect(mapStateToProps)(PaymentPage)
