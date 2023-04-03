import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Navigate } from 'react-router-dom'
import PairedDatePickers from '../components/molecules/PairedDatePickers'
import styles from '../utils/style_guide/MainWebpageStyle'
import { connect } from 'react-redux'

function Link (props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />
}

class EmotionalSearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchInput: '',
      userSessionValidated: this.props.userSession.validated
    }
  }

  render () {
    if (!this.state.userSessionValidated) {
      return <Navigate to='/login' />
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Emotional Machines</Text>
          </View>
          <View class="form-group form-row">
                <View class="col-10">
                  <Text style={styles.text}>
                    Find Emotions
                  </Text>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    value={this.state.searchInput}
                    style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
                  />
                  <br></br>
                  <PairedDatePickers />
                </View>
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    userSession: state.userSession
  }
}

export default connect(mapStateToProps)(EmotionalSearchPage)
