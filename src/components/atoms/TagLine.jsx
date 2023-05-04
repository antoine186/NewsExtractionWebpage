import React from 'react'
import { Component } from 'react'
import styles from '../../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'

class TagLine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: ''
    }
  }

  render () {
    return (
        <View>
            <View style={styles.rowContainer}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/red-tag.png')}
                    // href={`${window.location.origin}`}
                />
                <Text style={styles.tagText}>
                    "{this.state.searchInput}"
                </Text>
            </View>
        </View>
    )
  }
}

export default TagLine
