
function AccountCreationPageMock (instance) {
  instance.state.firstName = 'Potato'
  instance.state.lastName = 'Salad'
  instance.state.emailAddress = 'potato@salad.com'
  instance.state.password = 'Pass123@&'
  instance.state.confirmedPassword = 'Pass123@&'
  instance.state.dateBirth = '2000-01-01'
  instance.state.telephoneNumber = '+12025550162'
  instance.state.selectedCountryName = 'United States'
  instance.state.selectedCountryCode = 'US'
  instance.state.selectedStateCode = 'CA'
  instance.state.selectedStateName = 'California'
  instance.state.selectedCityName = 'San Francisco'
  instance.state.addressLine1 = 'Lombard Street'
  instance.state.addressLine2 = ''
  instance.state.zipCode = '94111'
}

export default AccountCreationPageMock
