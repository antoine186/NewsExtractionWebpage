import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../../utils/style_guide/AccountCreationPageStyle'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import CappedDatePicker from '../atoms/CappedDatePicker'

class AccountBasicInfoInputView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      emailAddress: this.props.emailAddress,
      password: this.props.password,
      dateBirth: this.props.dateBirth,
      telephoneNumber: this.props.telephoneNumber
    }
  }

  xyz () {

  }

  render () {
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(password) => xyz(password)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(password) => xyz(password)}
                />
            </View>
            <Text style={styles.text}>
                Date of birth
            </Text>
            <br></br>
            <CappedDatePicker minDate={'1900-01-01'}/>
            <br></br>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email Address"
                    placeholderTextColor="#003f5c"
                    onChangeText={(password) => xyz(password)}
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
                    onChangeText={(password) => xyz(password)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => xyz(password)}
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
