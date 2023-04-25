import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Navigate } from 'react-router-dom'
import CappedDatePicker from '../components/atoms/CappedDatePicker'
import styles from '../utils/style_guide/MainWebpageStyle'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { api, searchUrl } from '../utils/backend_configuration/BackendConfig'
import DateFormatter from '../utils/DateFormatter'
import SearchArticlesResultTable from '../components/molecules/SearchArticlesResultTable'
import ArticlesResultTableDataWrangler from './search_helper_functions/ArticlesResultTableDataWrangler'
import ClipLoader from 'react-spinners/ClipLoader'
import SearchOverallEmoResultTable from '../components/molecules/SearchOverallEmoResultTable'
import EmoEngagementStringFormatter from './search_helper_functions/EmoEngagementStringFormatter'
import TopBar from '../components/molecules/TopBar'

function Link(props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />
}

class EmotionalSearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchInput: '',
      dateInput: this.props.defaultDate,
      userSessionValidated: this.props.userSession.validated,
      minDate: this.props.minDate,
      searchOverallEmoResultTableData: [],
      searchArticlesResultTableData: [],
      noResultsToReturn: false,
      searchingInitiated: false,
      anyResponseFromServer: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({ searchingInitiated: true })

    api.post(searchUrl, {
      searchInput: this.state.searchInput,
      dateInput: this.state.dateInput
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

  render () {
    if (!this.state.userSessionValidated) {
      return (
        <View>
          <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
          <Navigate to='/login' />
        </View>
      )
    } else {
      return (
        <View>
        <TopBar settingsEnabled={true} />
        <View style={styles.container}>
          <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
            <View style={styles.header}>
              <Text style={styles.titleText}>Emotional Machines Search (Beta)</Text>
            </View>
            <View class="form-group form-row">
              <View class="col-10">
                <br></br>
                <br></br>
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
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
            {!this.state.searchingInitiated &&
              <View>
                <br></br>
                <br></br>
                <Text style={styles.text}>
                  <strong>Upcoming Features! Stay Posted:</strong>
                  <ul>
                    <li>Tags: Each customer can tag up to 5 topics. Emotional engagement will be reported back to them daily</li>
                    <li>Increased metadata regarding the most emotionally engaged articles such as how long, what kinds of keywords used and etc...</li>
                    <li>Emotional concepts driving the emotional engagement. For instance, what kind of subtopics is consistently brought up in angry articles?</li>
                  </ul>
                </Text>
              </View>
            }
            <br></br>
            {this.state.searchingInitiated && !this.state.anyResponseFromServer &&
              <View>
                <br></br>
                <br></br>
                <Text style={styles.text}>
                  Give Me a Minute or Two...
                </Text>
                <br></br>
                <br></br>
                <ClipLoader
                  color={'#e75fa6'}
                  size={200}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </View>
            }

            {this.state.searchingInitiated && !this.state.noResultsToReturn && this.state.anyResponseFromServer &&
              <Text style={styles.text}>
                Results One Week Prior and Up to Selected Date
              </Text>
            }
            <br></br>
            {this.state.noResultsToReturn &&
              <Text style={styles.text}>
                No results found! Maybe the date is too recent... Please refresh page to initiate another search.
              </Text>
            }
            <SearchOverallEmoResultTable tableData={this.state.searchOverallEmoResultTableData} />
            <SearchArticlesResultTable tableData={this.state.searchArticlesResultTableData} />
        </View>
        </View>
      )
    }
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
    userSession: state.userSession
  }
}

export default connect(mapStateToProps)(EmotionalSearchPage)
