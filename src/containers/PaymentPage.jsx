import React, { Component } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CardInput from '../components/atoms/CardInput'
import { loadStripe } from '@stripe/stripe-js'
import { stripePublicKey } from '../utils/stripe_configuration/StripeConfig'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/AccountDetailsInputPageStyle'
import { connect } from 'react-redux'

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
            <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
            <Text style={styles.titleText}>
                Your Payment Details
            </Text>
            <br></br>
            <br></br>
            <br></br>
            <View style={styles.stripeCardElement}>
                <Elements stripe={this.state.stripePromise}>
                    <CardInput />
                </Elements>
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    accountData: state.accountData
  }
}

export default connect(mapStateToProps)(PaymentPage)
