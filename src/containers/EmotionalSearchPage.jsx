import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import CappedDatePicker from '../components/atoms/CappedDatePicker'
import styles from '../utils/style_guide/MainWebpageStyle'
import PropTypes from 'prop-types'
import { api, searchUrl, getPreviousSearchResult } from '../utils/backend_configuration/BackendConfig'
import DateFormatter from '../utils/DateFormatter'
import SearchArticlesResultTable from '../components/molecules/SearchArticlesResultTable'
import ArticlesResultTableDataWrangler from './search_helper_functions/ArticlesResultTableDataWrangler'
import ClipLoader from 'react-spinners/ClipLoader'
import SearchOverallEmoResultTable from '../components/molecules/SearchOverallEmoResultTable'
import EmoEngagementStringFormatter from './search_helper_functions/EmoEngagementStringFormatter'
import EmoSearchBasicResultCard from '../components/molecules/EmoSearchBasicResultCard'
import { connect } from 'react-redux'
import EmoSearchOverallResultCard from '../components/molecules/EmoSearchOverallResultCard'

function Link (props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />
}

class EmotionalSearchPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: '',
      dateInput: this.props.defaultDate,
      minDate: this.props.minDate,
      searchOverallEmoResultTableData: [],
      searchArticlesResultTableData: [],
      noResultsToReturn: false,
      searchingInitiated: false,
      anyResponseFromServer: false,
      startDateString: '',
      endDateString: ''
    }

    api.post(getPreviousSearchResult, {
      username: this.props.accountData.accountData.payload.emailAddress
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data !== 'Error') {
        console.log('Retrieved previous search returned something!')
        this.setState({ searchInput: response.data.responsePayload.previous_search_result.search_input })
        this.setState({ startDateString: this.date2String(response.data.responsePayload.previous_search_result.search_start_date) })
        this.setState({ endDateString: this.date2String(response.data.responsePayload.previous_search_result.search_end_date) })
        this.populateOverallEmoResultTable(response.data.responsePayload.previous_search_result)
        this.populateArticlesResultTable(response.data.responsePayload.previous_search_result)
      } else {
        this.setState({ noResultsToReturn: true })
      }
    }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({ searchingInitiated: true })
    this.setState({ noResultsToReturn: false })

    api.post(searchUrl, {
      searchInput: this.state.searchInput,
      dateInput: this.state.dateInput,
      username: this.props.accountData.accountData.payload.emailAddress
    }, {
      withCredentials: true
    }
    ).then(response => {
      this.setState({ anyResponseFromServer: true })

      if (response.data !== 'Error') {
        console.log('Search returned something!')
        this.populateOverallEmoResultTable(response.data)
        this.populateArticlesResultTable(response.data)
      } else {
        this.setState({ noResultsToReturn: true })
        this.setState({ searchingInitiated: false })
        this.forceUpdate()
      }
    }
    )
  }

  onChange (event) {
    const selectedDate = new Date(event.target.value)
    this.setState({ dateInput: DateFormatter(selectedDate) })
  }

  populateOverallEmoResultTable (data) {
    const searchOverallEmoResultTableData = []

    const overallEmoResultDict = {
      overall_emo: 'Overall Emotional Engagement with Search Topic Over All Articles Found!',
      emotional_engagement: EmoEngagementStringFormatter(data.average_emo_breakdown)
    }

    searchOverallEmoResultTableData.push(overallEmoResultDict)

    this.setState({ searchOverallEmoResultTableData })
    this.setState({ searchingInitiated: false })
  }

  populateArticlesResultTable (data) {
    const searchArticlesResultTableData = []

    const articlesResultsDict = ArticlesResultTableDataWrangler(data)

    searchArticlesResultTableData.push(
      articlesResultsDict.Happiest,
      articlesResultsDict.Angriest,
      articlesResultsDict.Disgusted,
      articlesResultsDict.Fearful,
      articlesResultsDict.Neutral,
      articlesResultsDict.Sadest,
      articlesResultsDict.Surprised
    )

    this.setState({ searchArticlesResultTableData })
  }

  date2String (dateArray) {
    let dateString = ''

    dateString = dateString + dateArray[1] + '/'
    dateString = dateString + dateArray[2] + '/'
    dateString = dateString + dateArray[0]

    return dateString
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
                placeholder={'Try searching \'ChatGPT\'... (result might take a few minutes)'}
                style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
              />
              <br></br>
              <CappedDatePicker minDate={this.state.minDate} onChange={this.onChange.bind(this)} />
              {!this.state.searchingInitiated &&
                <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
                  <Text style={styles.text}>SEARCH</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
          <br></br>
          {this.state.searchingInitiated &&
            <View>
              <br></br>
              <br></br>
              <Text style={styles.text}>
                Please Come Back in a Minute or Two...
              </Text>
              <br></br>
              <br></br>
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

          {!this.state.searchingInitiated && !this.state.noResultsToReturn &&
            <Text style={styles.text}>
              From {this.state.startDateString} To {this.state.endDateString}
            </Text>
          }
          <br></br>
          {this.state.noResultsToReturn && !this.state.searchingInitiated &&
            <Text style={styles.text}>
              No results found! Maybe the date is too recent... Please refresh page to initiate another search.
            </Text>
          }
          {false &&
          <>
            <SearchOverallEmoResultTable tableData={this.state.searchOverallEmoResultTableData} />
            <SearchArticlesResultTable tableData={this.state.searchArticlesResultTableData} />
          </>
          }
          {!this.state.searchingInitiated && !this.state.noResultsToReturn &&
          <View>
            <EmoSearchOverallResultCard resultData={this.state.searchOverallEmoResultTableData} />
            <EmoSearchBasicResultCard
              emoIcon={'😃'}
              articleData={this.state.searchArticlesResultTableData[0]}
              />
          </View>
          }
        </View>
    )
  }
}

const relevantDate = new Date()
relevantDate.setDate(relevantDate.getDate() - 1)
const yesterday = DateFormatter(relevantDate)

EmotionalSearchPage.propTypes = {
  minDate: PropTypes.string,
  defaultDate: PropTypes.string
}

EmotionalSearchPage.defaultProps = {
  minDate: '2006-01-01',
  defaultDate: yesterday
}

const mapStateToProps = state => {
  return {
    accountData: state.accountData
  }
}

export default connect(mapStateToProps)(EmotionalSearchPage)
