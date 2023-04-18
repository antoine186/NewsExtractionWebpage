import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../../utils/style_guide/AccountCreationPageStyle'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import CappedDatePicker from '../atoms/CappedDatePicker'
import { Country, State, City } from 'country-state-city'
import Select from 'react-select'

class AccountBasicInfoInputView extends React.Component {
  constructor (props) {
    super(props)

    const countries = Country.getAllCountries()

    const updatedCountries = countries.map((country) => ({
      label: country.name,
      value: country.id,
      ...country
    }))

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      emailAddress: this.props.emailAddress,
      password: this.props.password,
      confirmedPassword: this.props.confirmedPassword,
      dateBirth: this.props.dateBirth,
      minDateOfBirth: '1900-01-01',
      telephoneNumber: this.props.telephoneNumber,
      countries: updatedCountries,
      selectedCountryCode: '',
      states: '',
      cities: ''
    }
  }

  countrySelected (selectedCountry) {
    const countryCode = selectedCountry.isoCode

    const updatedStates = State
      .getStatesOfCountry(countryCode)
      .map((state) => ({ label: state.name, value: state.id, ...state }))

    this.setState({ states: updatedStates })
    this.setState({ selectedCountryCode: countryCode })
  }

  stateSelected (selectedState) {
    const updatedCities = City
      .getCitiesOfState(this.state.selectedCountryCode, selectedState.isoCode)
      .map((city) => ({ label: city.name, value: city.id, ...city }))

    this.setState({ cities: updatedCities })
  }

  render () {
    return (
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Your New Account
                </Text>
                <br></br>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="First Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={firstName => this.setState({ firstName })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Last Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={lastName => this.setState({ lastName })}
                    />
                </View>
                <Text style={styles.text}>
                    Date of birth
                </Text>
                <br></br>
                <CappedDatePicker minDate={this.state.minDateOfBirth} />
                <br></br>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email Address"
                        placeholderTextColor="#003f5c"
                        onChangeText={emailAddress => this.setState({ emailAddress })}
                    />
                </View>
                <PhoneInput
                    placeholder="Telephone number"
                    defaultCountry="US"
                    value={this.state.telephoneNumber}
                    onChange={telephoneNumber => this.setState({ telephoneNumber })}
                    inputComponent={TextInput}
                />
                <br></br>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={confirmedPassword => this.setState({ confirmedPassword })}
                    />
                </View>

                <Text style={styles.titleText}>
                    Your Address
                </Text>
                <br></br>

                <View style={styles.rowContainer}>
                    <View style={styles.dualRowInputViewLeft}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Address Line 1"
                            placeholderTextColor="#003f5c"
                            onChangeText={confirmedPassword => this.setState({ confirmedPassword })}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Address Line 2"
                            placeholderTextColor="#003f5c"
                            onChangeText={confirmedPassword => this.setState({ confirmedPassword })}
                        />
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowSelectViewLeft}>
                        <Select
                            id="country"
                            name="country"
                            label="Country"
                            options={this.state.countries}
                            onChange={(value) => {
                              this.countrySelected(value)
                            }}
                            menuPortalTarget={document.querySelector('body')}
                        />
                    </View>
                    <View style={styles.rowSelectViewLeft}>
                        <Select
                            id="state"
                            name="state"
                            label="State"
                            options={this.state.states}
                            onChange={(value) => {
                              this.stateSelected(value)
                            }}
                            menuPortalTarget={document.querySelector('body')}
                        />
                    </View>
                    <View style={styles.selectView}>
                        <Select
                            id="city"
                            name="city"
                            label="Cities"
                            options={this.state.cities}
                            onChange={(value) => {
                            // setValues({ country: value, state: null, city: null }, false)
                            }}
                            menuPortalTarget={document.querySelector('body')}
                        />
                    </View>
                </View>
                <br></br>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Zip code"
                        placeholderTextColor="#003f5c"
                        onChangeText={confirmedPassword => this.setState({ confirmedPassword })}
                    />
                </View>
            </View>
    )
  }
}

AccountBasicInfoInputView.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  emailAddress: PropTypes.string,
  password: PropTypes.string,
  dateBirth: PropTypes.string,
  telephoneNumber: PropTypes.string
}

AccountBasicInfoInputView.defaultProps = {
  telephoneNumber: ''
}

export default AccountBasicInfoInputView
