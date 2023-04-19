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
      telephoneNumber: this.props.telephoneNumber
    }
  }

  dateOfBirthSelected (event) {
    const selectedDate = new Date(event.target.value)
    this.setState({ dateBirth: DateFormatter(selectedDate) })
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
                    onChangeText={firstName => this.setState({ firstName })}
                    maxLength={userInputFieldMaxCharacter}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={lastName => this.setState({ lastName })}
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
                    onChangeText={emailAddress => this.setState({ emailAddress })}
                    maxLength={userInputFieldMaxCharacter}
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
                    maxLength={userInputFieldMaxCharacter}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={confirmedPassword => this.setState({ confirmedPassword })}
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
