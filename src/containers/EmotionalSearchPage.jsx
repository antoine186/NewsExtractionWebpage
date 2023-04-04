import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Navigate } from 'react-router-dom'
import CappedDatePicker from '../components/atoms/CappedDatePicker'
import styles from '../utils/style_guide/MainWebpageStyle'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { api, searchUrl } from '../utils/backend_configuration/BackendConfig'
import DateFormatter from '../utils/DateFormatter'

function Link(props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />
}

class EmotionalSearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      dateInput: this.props.minDate,
      userSessionValidated: this.props.userSession.validated,
      minDate: this.props.minDate
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    api.post(searchUrl, {
      searchInput: this.state.searchInput,
      dateInput: this.state.dateInput
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data) {
        console.log('Search returned something!')
      }
    }
    )
  }

  onChange (event) {
    const selectedDate = new Date(event.target.value)
    this.setState({ dateInput: DateFormatter(selectedDate) })
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
                Search Topic Emotions
              </Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={text => this.setState({ searchInput: text })}
                placeholder={'Search... (result might take a few seconds)'}
                style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
              />
              <br></br>
              <CappedDatePicker minDate={this.state.minDate} onChange={this.onChange.bind(this)} />
              <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
                <Text style={styles.text}>SEARCH</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
}

EmotionalSearchPage.propTypes = {
  minDate: PropTypes.string
}

EmotionalSearchPage.defaultProps = {
  minDate: '2006-01-01'
}

const mapStateToProps = state => {
  return {
    userSession: state.userSession
  }
}

export default connect(mapStateToProps)(EmotionalSearchPage)
