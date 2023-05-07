import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import styles from '../utils/style_guide/MainWebpageStyle'

class ProgressionPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
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
                        numberOfLines={4}
                        maxLength={40}
                        value={this.state.searchInput}
                        onChangeText={text => this.setState({ searchInput: text })}
                        placeholder={'Try charting \'ChatGPT\'... (charting might take a few hours)'}
                        style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
                    />
                    <br></br>
                    {!this.state.searchingInitiated &&
                        <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
                            <Text style={styles.text}>CHART</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <br></br>
        </View>
    )
  }
}

export default ProgressionPage
