import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import styles from '../utils/style_guide/MainWebpageStyle'
import { api } from '../utils/backend_configuration/BackendConfig'
import { connect } from 'react-redux'
import DateFormatter from '../utils/DateFormatter'
import ClipLoader from 'react-spinners/ClipLoader'

class LinkingPage extends Component {
  constructor (props) {
    super(props)

    const relevantDate = new Date()

    relevantDate.setDate(relevantDate.getDate() - 1)
    const yesterday = DateFormatter(relevantDate)

    this.state = {
      linkingInput1: '',
      linkingInput2: '',
      dateInput: yesterday,
      linkingInput1Empty: false,
      linkingInput2Empty: false,
      linkingInitiated: false,
      noResultsToShow: false,
      linkingFailed: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let validLinking = true

    if (this.state.linkingInput1 === '') {
      this.setState({ linkingInput1Empty: true })
      validLinking = false
    } else {
      this.setState({ linkingInput1Empty: false })
    }

    if (this.state.linkingInput2 === '') {
      this.setState({ linkingInput2Empty: true })
      validLinking = false
    } else {
      this.setState({ linkingInput2Empty: false })
    }

    if (validLinking) {
      console.log('Attempting linking')

      console.log(this.state.linkingInput1Empty)

      this.setState({ linkingInitiated: true })
      this.setState({ noResultsToShow: false })
      this.setState({ linkingFailed: false })

      api.post(progressionCharting, {
        linkingInput1: this.state.linkingInput1,
        linkingInput2: this.state.linkingInput2,
        dateInput: this.state.dateInput,
        username: this.props.accountData.accountData.payload.emailAddress
      }, {
        withCredentials: true
      }
      ).then(response => {
        if (response.data.operation_success) {
          console.log('Linking succeeded')

          this.setState({ linkingInitiated: false })
          this.setState({ noResultsToShow: false })
          this.setState({ linkingFailed: false })
        } else {
          console.log('Linking failed')

          this.setState({ linkingInitiated: false })
          this.setState({ noResultsToShow: true })
          this.setState({ linkingFailed: true })
        }
      }
      )
    }
  }

  render () {
    return (
        <View style={styles.innerContainer}>
            <View class="form-group form-row">
                <View class="col-10">
                    <br></br>
                    <br></br>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={2}
                        maxLength={20}
                        value={this.state.linkingInput1}
                        onChangeText={text => this.setState({ linkingInput1: text })}
                        placeholder={'Try linking \'ChatGPT\'... (linking might take a few hours)'}
                        style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
                    />
                    {this.state.linkingInput1Empty &&
                    <View>
                        <Text style={styles.errorText}>
                        Please add a first topic to link.
                        </Text>
                        <br></br>
                    </View>
                    }
                    <br></br>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={2}
                        maxLength={20}
                        value={this.state.linkingInput2}
                        onChangeText={text => this.setState({ linkingInput2: text })}
                        placeholder={'Try linking \'Sam Altman\'... (linking might take a few hours)'}
                        style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
                    />
                    {this.state.linkingInput2Empty &&
                    <View>
                        <Text style={styles.errorText}>
                        Please add a second topic to link.
                        </Text>
                        <br></br>
                    </View>
                    }
                    <br></br>
                    {!this.state.linkingInitiated &&
                        <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
                            <Text style={styles.text}>LINK</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {this.state.linkingInitiated &&
            <View>
                <View>
                    <br></br>
                    <br></br>
                    <Text style={styles.text}>
                        Still linking... Please come back in half an hour and !REFRESH! the page.
                    </Text>
                    <br></br>
                    <br></br>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <ClipLoader
                        color={'#e75fa6'}
                        size={200}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </View>
            </View>
            }
            <br></br>
        </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    accountData: state.accountData
  }
}

export default connect(mapStateToProps)(LinkingPage)
