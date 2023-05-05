import React, { Component } from 'react'

import styles from '../../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import { api, taggingSearch } from '../../utils/backend_configuration/BackendConfig'
import TagSearchResult from '../atoms/TagSearchResult'
import { SpinnerRoundFilled } from 'spinners-react'

const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

class TagLine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: this.props.searchInput,
      searchDate: this.props.searchDate,
      dayBeforeSearchDate: this.props.dayBeforeSearchDate,
      accountData: this.props.accountData,
      showResults: false
    }

    this.initiateSearch()
  }

  initiateSearch () {
    api.post(taggingSearch, {
      username: this.props.accountData.accountData.payload.emailAddress,
      searchInput: this.state.searchInput,
      searchDate: this.state.searchDate,
      dayBeforeSearchDate: this.state.dayBeforeSearchDate
    }, {
      withCredentials: true
    }
    )
  }

  render () {
    return (
      <View>
        <View style={styles.rowContainer}>
          <SpinnerRoundFilled
            style={{
              marginRight: 0.5 * vw,
              alignItems: 'center',
              display: 'flex',
              height: '100%'
            }}
            color="#B533FF"
          />
          <TouchableOpacity
            onPress={() => this.setState({ showResults: !this.state.showResults })}
            style={{}}
          >
            <Image
              style={styles.imageTag}
              source={require('../../assets/images/red-tag.png')}
            />
          </TouchableOpacity>
          <Text style={styles.tagText}>
              "{this.state.searchInput}"
          </Text>
        </View>
        {this.state.showResults &&
          <TagSearchResult
          startDateString={this.state.dayBeforeSearchDate}
          endDateString={this.state.searchDate}
        />
        }
      </View>
    )
  }
}

export default TagLine
