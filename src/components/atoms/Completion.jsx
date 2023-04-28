import React from 'react'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../../utils/style_guide/AccountDetailsInputPageStyle'
import TopBar from '../molecules/TopBar'
import { api, storeNewSubscription, updateSubscriptionStatus } from '../../utils/backend_configuration/BackendConfig'
import { setValidSubscription } from '../../store/Slices/ValidSubscriptionSlice'
import { clearSubscriptionAlreadyCreated } from '../../store/Slices/subscriptionAlreadyCreatedSlice'

function Completion (props) {
  const accountData = useSelector(state => state.accountData)
  const stripeSubscription = useSelector(state => state.stripeSubscription)

  const dispatch = useDispatch()

  if (!props.amendPaymentMethod) {
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
      stripeSubscriptionId: stripeSubscription.stripe_subscription_id,
      subscriptionStatus: 'active'
    }, {
      withCredentials: true
    }
    )
  }

  dispatch(setValidSubscription(true))
  dispatch(clearSubscriptionAlreadyCreated())

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
