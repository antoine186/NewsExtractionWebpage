import React from 'react'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../../utils/style_guide/AccountDetailsInputPageStyle'
import TopBar from '../molecules/TopBar'
import { api, storeNewSubscription, updateSubscriptionStatus } from '../../utils/backend_configuration/BackendConfig'
import { useSelector } from 'react-redux'
import ClearEntireStore from '../../utils/session_helpers/ClearEntireStore'
import CheckEmptyObject from '../../utils/CheckEmptyObject'
import { clearAccountData } from '../../store/Slices/AccountDataSlice'
import { useDispatch } from 'react-redux'
import { clearAmendPayment } from '../../store/Slices/AmendPaymentSlice'
import { clearStripeCustomerId } from '../../store/Slices/StripeCustomerIdSlice'
import { clearstripeSubscription } from '../../store/Slices/StripeSubscriptionSlice'
import { clearValidSubscription } from '../../store/Slices/ValidSubscriptionSlice'

function Completion (props) {
  const accountData = useSelector(state => state.accountData)
  const stripeSubscription = useSelector(state => state.stripeSubscription)
  const amendPaymentState = useSelector(state => state.amendPaymentState)
  const userSession = useSelector(state => state.userSession)

  const dispatch = useDispatch()

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

    if (!userSession.validated) {
      console.log('Clearing account data as we completed payment outside user session')

      dispatch(clearAccountData())
      dispatch(clearAmendPayment())
      dispatch(clearStripeCustomerId())
      dispatch(clearstripeSubscription())
      dispatch(clearValidSubscription())

      ClearEntireStore()
    }
  }

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
