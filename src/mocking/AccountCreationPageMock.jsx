
function AccountCreationPageMock (props) {
  props.firstName = 'Potato'
  props.lastName = 'Salad'
  props.emailAddress = 'potato@salad.com'
  props.password = 'Pass123@&'
  props.confirmedPassword = 'Pass123@&'
  props.dateBirth = '2000-01-01'
  props.telephoneNumber = '202-555-0162'
  props.selectedCountryName = 'United States'
  props.selectedCountryCode = ''
  props.selectedStateCode = ''
  props.selectedStateName = ''
  props.selectedCityName = ''
  props.addressLine1 = ''
  props.addressLine2 = ''
  props.zipCode = ''

  return props
}

export default AccountCreationPageMock
