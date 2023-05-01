import axios from 'axios'

export const backendUrl = 'http://localhost:80/api'
// export const backendUrl = 'http://ec2-18-217-184-225.us-east-2.compute.amazonaws.com:5000/api'
export const loginAuthUrl = '/auth-login'
export const sessionAuthUrl = '/session-validate'
export const searchUrl = '/search'
export const basicAccountCreateUrl = '/basic-account-create'
export const stripeCustomerCreate = '/stripe-customer-create'
export const subscriptionCreate = '/subscription_create'
export const getSubscriptionStatus = '/get-subscription-status'
export const getSubscriptionId = '/get_subscription_id'
export const storeNewSubscription = '/store_new_subscription'
export const updateSubscriptionStatus = '/update_subscription_status'
export const deleteAccount = '/delete_account'
export const retrieveSubscriptionDetails = '/retrieve_subscription_details'
export const retrieveAccountData = '/retrieve_account_data'
export const setupintentCreation = '/setupintent_creation'
export const getStripeCustomerId = '/get_stripe_customer_id'
export const deleteSubscription = '/delete_subscription'
export const forgotPassword = '/forgot_password'
export const passwordReset = '/password_reset'

export const api = axios.create({
  baseURL: backendUrl
})
