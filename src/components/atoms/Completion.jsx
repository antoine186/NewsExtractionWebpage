import React from 'react'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../../utils/style_guide/AccountDetailsInputPageStyle'
import TopBar from '../molecules/TopBar'
import { api, storeNewSubscription, updateSubscriptionStatus } from '../../utils/backend_configuration/BackendConfig'
import { useSelector } from 'react-redux'
import ClearEntireStore from '../../utils/session_helpers/ClearEntireStore'
import CheckEmptyObject from '../../utils/CheckEmptyObject'

function Completion (props) {
  const accountData = useSelector(state => state.accountData)
  const stripeSubscription = useSelector(state => state.stripeSubscription)
  const amendPaymentState = useSelector(state => state.amendPaymentState)

  if (!CheckEmptyObject(accountData.accountData)) {
    if (!amendPaymentState.amendPaymentState) {
      console.log('Storing the new sub')
      api.post(storeNewSubscription, {
        emailAddress: accountData.accountData.payload.emailAddress,
        stripeSubscriptionId: stripeSubscription.stripeSubscription.payload.stripe_subscription_id,
        subscriptionStatus: 'active'
      }, {
        withCredentials: true
      }
      )
    } else {
      console.log('Updating an existing sub')
      api.post(updateSubscriptionStatus, {
        stripeSubscriptionId: stripeSubscription.stripeSubscription.payload.stripe_subscription_id,
        subscriptionStatus: 'active'
      }, {
        withCredentials: true
      }
      )
    }
  }

  ClearEntireStore()

  return (
    <View style={styles.container}>
    <TopBar settingsEnabled={false} />
    <View style={styles.container}>
      <h1> Thank You & Welcome to Emotional Machines! 🎉</h1>
    </View>
    </View>
  )
}

export default Completion
