import React, { Component } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { stripePublicKey } from '../utils/stripe_configuration/StripeConfig'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/AccountDetailsInputPageStyle'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import CheckoutForm from '../components/atoms/CheckoutForm'
import TopBar from '../components/molecules/TopBar'
import { basicSubscriptionPricePerMonth } from '../utils/essential_numbers_strings/PaymentNumbersStrings'
import { api, getSubscriptionStatus, getSubscriptionId, subscriptionCreate } from '../utils/backend_configuration/BackendConfig'
import { setAccountData } from '../store/Slices/AccountDataSlice'
import { setstripeSubscription } from '../store/Slices/StripeSubscriptionSlice'
import { setValidSubscription } from '../store/Slices/ValidSubscriptionSlice'
import { basicSubscriptionPriceId } from '../utils/stripe_configuration/StripeConfig'
import { setSubscriptionAlreadyCreated } from '../store/Slices/subscriptionAlreadyCreatedSlice'
import { clearSubscriptionAlreadyCreated } from '../store/Slices/subscriptionAlreadyCreatedSlice'

class PaymentPage extends Component {
  constructor (props) {
    super(props)

    const stripePromise = loadStripe(stripePublicKey)

    this.state = {
      stripePromise
    }

    api.post(getSubscriptionId, {
      username: this.props.accountData.accountData.payload.emailAddress
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data.operation_success) {
        console.log('Found existing subscription')
        this.props.setstripeSubscription(response.data.responsePayload)

        api.post(getSubscriptionStatus, {
          stripeSubscriptionId: response.data.responsePayload.stripe_subscription_id
        }, {
          withCredentials: true
        }
        ).then(response => {
          if (response.data.operation_success) {
            console.log(response.data.responsePayload.stripe_subscription_status)
            if (response.data.responsePayload.stripe_subscription_status === 'active' ||
            response.data.responsePayload.stripe_subscription_status === 'trialing') {
              this.props.setValidSubscription(true)
            } else {
              this.props.setValidSubscription(false)
            }
          } else { /* empty */ }
        }
        )
      } else {
        console.log('No existing subscription')
        setValidSubscription(false)
      }
    }
    )

    if (!this.props.validSubscription.validSubscription.payload && !this.props.subscriptionAlreadyCreated.subscriptionAlreadyCreated) {
      console.log('Attempted subscription creation')
      api.post(subscriptionCreate, {
        priceId: basicSubscriptionPriceId,
        stripeCustomerId: this.props.stripeCustomerId.stripeCustomerId.payload.stripe_customer_id,
        emailAddress: this.props.accountData.accountData.payload.emailAddress
      }, {
        withCredentials: true
      }
      ).then(response => {
        if (response.data.operation_success) {
          console.log('Created subscription')
          this.props.setSubscriptionAlreadyCreated()
          this.props.setstripeSubscription(response.data.responsePayload)
        } else {
          console.log('Subscription creation failed')
        }
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
          {(this.props.userSession.validated && !this.props.validSubscription.validSubscription.payload) &&
            <Text style={styles.titleText2}>
              You don't have an active subscription.
              Please add your payment details to get a {basicSubscriptionPricePerMonth} USD per month subscription
            </Text>
          }
          {(this.props.userSession.validated && this.props.validSubscription.validSubscription.payload) &&
            <Text style={styles.titleText2}>
              You have an active subscription.
              You can change your payment details here.
            </Text>
          }
          <br></br>
          <br></br>
          <br></br>
          {!this.props.validSubscription.validSubscription.payload &&
            <View style={styles.stripeCardElement}>
              <Elements stripe={this.state.stripePromise} options={{ clientSecret: this.props.stripeSubscription.stripeSubscription.payload.client_secret }}>
                <CheckoutForm amendPaymentMethod={false} />
              </Elements>
            </View>
          }
          {this.props.validSubscription.validSubscription.payload &&
            <View style={styles.stripeCardElement}>
              <Elements stripe={this.state.stripePromise} options={{ clientSecret: this.props.stripeSubscription.stripeSubscription.payload.client_secret }}>
                <CheckoutForm amendPaymentMethod={true} />
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
    userSession: state.userSession,
    accountData: state.accountData,
    stripeCustomerId: state.stripeCustomerId,
    validSubscription: state.validSubscription,
    subscriptionAlreadyCreated: state.subscriptionAlreadyCreated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccountData: (value) => dispatch(setAccountData(value)),
    setstripeSubscription: (value) => dispatch(setstripeSubscription(value)),
    setValidSubscription: (value) => dispatch(setValidSubscription(value)),
    setSubscriptionAlreadyCreated: () => dispatch(setSubscriptionAlreadyCreated()),
    clearSubscriptionAlreadyCreated: () => dispatch(clearSubscriptionAlreadyCreated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
