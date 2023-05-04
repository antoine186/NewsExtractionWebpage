import React from 'react'
import styles from '../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import TagLine from '../components/atoms/TagLine'
import { api } from '../utils/backend_configuration/BackendConfig'
import DateFormatter from '../utils/DateFormatter'

class TaggingPage extends React.Component {
  constructor (props) {
    super(props)

    const relevantDate = new Date()

    relevantDate.setDate(relevantDate.getDate() - 1)
    const yesterday = DateFormatter(relevantDate)

    this.state = {
      searchInput: '',
      searchInputs: [],
      yesterday
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.searchInputs.length < 5) {
      const newSearchInputs = this.state.searchInputs
      newSearchInputs.push({
        searchInput: this.state.searchInput,
        searchDate: this.state.yesterday
      })
      this.setState({
        searchInputs: newSearchInputs
      })
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
                        placeholder={'Try tagging \'ChatGPT\'... (tagging might take a few hours)'}
                        style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
                    />
                    <br></br>
                    {!this.state.searchingInitiated &&
                        <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
                            <Text style={styles.text}>ADD</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <br></br>
            {true &&
                <View>
                    <br></br>
                    <Text style={styles.titleText2}>
                        Below are your active tags
                    </Text>
                    <br></br>
                    <br></br>
                    {
                        this.state.searchInputs.map((searchInputs) => (
                            <View>
                                <TagLine />
                                <br></br>
                            </View>
                        ))
                    }
                </View>
            }
        </View>
    )
  }
}

export default TaggingPage
