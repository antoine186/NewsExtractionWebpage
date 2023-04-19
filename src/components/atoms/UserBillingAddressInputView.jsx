import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import { Country, State, City } from 'country-state-city'
import Select from 'react-select'
import styles from '../../utils/style_guide/AccountDetailsInputPageStyle'
import { userInputFieldMaxCharacter } from '../../utils/user_input_config/UserInputConfig'

class UserBillingAddressInputView extends React.Component {
  constructor (props) {
    super(props)

    const countries = Country.getAllCountries()

    const updatedCountries = countries.map((country) => ({
      label: country.name,
      value: country.id,
      ...country
    }))

    this.state = {
      countries: updatedCountries,
      selectedCountryCode: '',
      states: '',
      cities: '',
      addressLine1: this.props.addressLine1,
      addressLine2: this.props.addressLine2,
      zipCode: this.props.zipCode
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
        <View style={styles.subcontainer}>
            <Text style={styles.titleText}>
                Your Billing Address
            </Text>
            <br></br>

            <View style={styles.rowContainer}>
                <View style={styles.dualRowInputViewLeft}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Address Line 1"
                        placeholderTextColor="#003f5c"
                        onChangeText={addressLine1 => this.setState({ addressLine1 })}
                        maxLength={userInputFieldMaxCharacter}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Address Line 2"
                        placeholderTextColor="#003f5c"
                        onChangeText={addressLine2 => this.setState({ addressLine2 })}
                        maxLength={userInputFieldMaxCharacter}
                    />
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.rowSelectViewLeft}>
                    <Select
                        id="country"
                        name="country"
                        label="Country"
                        placeholder="Country"
                        options={this.state.countries}
                        onChange={(value) => {
                          this.countrySelected(value)
                        }}
                        styles={styles.selectViewHighlight}
                        menuPortalTarget={document.querySelector('body')}
                    />
                </View>
                <View style={styles.rowSelectViewLeft}>
                    <Select
                        id="state"
                        name="state"
                        label="State"
                        placeholder="State"
                        options={this.state.states}
                        onChange={(value) => {
                          this.stateSelected(value)
                        }}
                        styles={styles.selectViewHighlight}
                        menuPortalTarget={document.querySelector('body')}
                    />
                </View>
                <View style={styles.selectView}>
                    <Select
                        id="city"
                        name="city"
                        label="Cities"
                        placeholder="City"
                        options={this.state.cities}
                        onChange={(value) => {
                          // setValues({ country: value, state: null, city: null }, false)
                        }}
                        styles={styles.selectViewHighlight}
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
                    onChangeText={zipCode => this.setState({ zipCode })}
                    maxLength={userInputFieldMaxCharacter}
                />
            </View>
        </View>
    )
  }
}

export default UserBillingAddressInputView
