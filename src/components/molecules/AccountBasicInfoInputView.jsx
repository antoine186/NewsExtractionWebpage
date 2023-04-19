import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../../utils/style_guide/AccountDetailsInputPageStyle'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import CappedDatePicker from '../atoms/CappedDatePicker'
import DateFormatter from '../../utils/DateFormatter'
import { userInputFieldMaxCharacter } from '../../utils/user_input_config/UserInputConfig'

class AccountBasicInfoInputView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      emailAddress: this.props.emailAddress,
      password: this.props.password,
      confirmedPassword: this.props.confirmedPassword,
      dateBirth: this.props.dateBirth,
      minDateOfBirth: '1900-01-01',
      telephoneNumber: this.props.telephoneNumber,
      firstNameGrabber: this.props.firstNameGrabber,
      lastNameGrabber: this.props.lastNameGrabber,
      userEmailGrabber: this.props.userEmailGrabber,
      passwordGrabber: this.props.passwordGrabber,
      confirmedPasswordGrabber: this.props.confirmedPasswordGrabber,
      dateBirthGrabber: this.props.dateBirthGrabber,
      telNumberGrabber: this.props.telNumberGrabber
    }
  }

  setFirstName (firstName) {
    this.setState({ firstName })
    this.state.firstNameGrabber(firstName)
  }

  setLastName (lastName) {
    this.setState({ lastName })
    this.state.lastNameGrabber(lastName)
  }

  dateOfBirthSelected (event) {
    const selectedDate = new Date(event.target.value)
    const selectedDateFormatted = DateFormatter(selectedDate)
    this.setState({ dateBirth: selectedDateFormatted })
    this.state.dateBirthGrabber(selectedDateFormatted)
  }

  setUserEmail (email) {
    // Validate email here
    this.setState({ email })
    this.state.userEmailGrabber(email)
  }

  setTelephoneNumber (telephoneNumber) {
    // Validate phone number here
    this.setState({ telephoneNumber })
    this.state.telNumberGrabber(telephoneNumber)
  }

  setPassword (password) {
    this.setState({ password })
    this.state.passwordGrabber(password)
  }

  setConfirmedPassword (password) {
    // Double check password match here
    this.setState({ password })
    this.state.confirmedPasswordGrabber(password)
  }

  render () {
    return (
        <View style={styles.subcontainer}>
            <Text style={styles.titleText}>
                Your New Account
            </Text>
            <br></br>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={firstName => this.setFirstName(firstName)}
                    maxLength={userInputFieldMaxCharacter}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={lastName => this.setLastName(lastName)}
                    maxLength={userInputFieldMaxCharacter}
                />
            </View>
            <Text style={styles.text}>
                Date of birth
            </Text>
            <br></br>
            <CappedDatePicker minDate={this.state.minDateOfBirth} onChange={this.dateOfBirthSelected.bind(this)} />
            <br></br>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email Address"
                    placeholderTextColor="#003f5c"
                    onChangeText={emailAddress => this.setUserEmail(emailAddress)}
                    maxLength={userInputFieldMaxCharacter}
                />
            </View>
            <PhoneInput
                placeholder="Telephone number"
                defaultCountry="US"
                value={this.state.telephoneNumber}
                onChange={telephoneNumber => this.setTelephoneNumber(telephoneNumber)}
                inputComponent={TextInput}
            />
            <br></br>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={password => this.setPassword(password)}
                    maxLength={userInputFieldMaxCharacter}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={confirmedPassword => this.setConfirmedPassword(confirmedPassword)}
                    maxLength={userInputFieldMaxCharacter}
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
