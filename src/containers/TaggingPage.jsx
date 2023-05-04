import React from 'react'
import styles from '../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import TagLine from '../components/molecules/TagLine'
import DateFormatterForUI from '../utils/DateFormatterForUI'
import DateFormatter from '../utils/DateFormatter'
import { connect } from 'react-redux'

class TaggingPage extends React.Component {
  constructor (props) {
    super(props)

    const relevantDate = new Date()

    relevantDate.setDate(relevantDate.getDate() - 1)
    const yesterdayString = DateFormatterForUI(relevantDate)
    const yesterday = DateFormatter(relevantDate)

    relevantDate.setDate(relevantDate.getDate() - 1)

    const dayBeforeYesterday = DateFormatter(relevantDate)

    this.state = {
      searchInput: '',
      searchInputs: [],
      yesterdayString,
      yesterday,
      dayBeforeYesterday
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.searchInputs.length < 5) {
      const newSearchInputs = this.state.searchInputs
      newSearchInputs.push({
        searchInput: this.state.searchInput,
        searchDate: this.state.yesterday,
        dayBeforeSearchDate: this.state.dayBeforeYesterday
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
                            <Text style={styles.text}>TAG</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <br></br>
            {true &&
                <View>
                    <br></br>
                    <Text style={styles.titleText2}>
                        Below are your active tags for {this.state.yesterdayString}
                    </Text>
                    <br></br>
                    <br></br>
                    {
                    this.state.searchInputs.map((searchInputs) => (
                        <View>
                            <TagLine
                                searchInput={searchInputs.searchInput}
                                searchDate={searchInputs.searchDate}
                                dayBeforeSearchDate={searchInputs.dayBeforeSearchDate}
                                accountData={this.props.accountData}
                            />
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

const mapStateToProps = state => {
  return {
    accountData: state.accountData
  }
}

export default connect(mapStateToProps)(TaggingPage)
