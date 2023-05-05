import React, { Component } from 'react'

import styles from '../../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import { api, taggingSearch, getPreviousTaggingResult } from '../../utils/backend_configuration/BackendConfig'
import TagSearchResult from '../atoms/TagSearchResult'
import { SpinnerRoundFilled } from 'spinners-react'
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')
import EmoEngagementStringFormatter from '../../containers/search_helper_functions/EmoEngagementStringFormatter'
import ArticlesResultTableDataWrangler from '../../containers/search_helper_functions/ArticlesResultTableDataWrangler'
import { connect } from 'react-redux'
import EmoChangeStringFormatter from '../../containers/search_helper_functions/EmoChangeStringFormatter'

class TagLine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: this.props.searchInput,
      searchDate: this.props.searchDate,
      dayBeforeSearchDate: this.props.dayBeforeSearchDate,
      accountData: this.props.accountData,
      showResults: false,
      existingTaggingInput: this.props.existingTaggingInput,
      searchOverallEmoResultTableData: '',
      searchArticlesResultTableData: ''
    }

    this.getTaggingResults.bind(this)
    this.initiateSearch.bind(this)

    this.getTaggingResults()
  }

  populateOverallEmoResultTable (data) {
    const searchOverallEmoResultTableData = []

    const overallEmoResultDict = {
      overall_emo: 'Overall Emotional Engagement with Search Topic Over All Articles Found!',
      emotional_engagement: EmoEngagementStringFormatter(data.average_emo_breakdown),
      emotional_engagement_percentage_change: EmoChangeStringFormatter(data.average_emo_breakdown, data.previous_average_emo_breakdown)
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

  getTaggingResults () {
    api.post(getPreviousTaggingResult, {
      username: this.props.accountData.accountData.payload.emailAddress,
      searchInput: this.state.searchInput
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data !== 'Error') {
        console.log('Tagging returned something!')
        this.populateOverallEmoResultTable(response.data.responsePayload.previous_search_result)
        this.populateArticlesResultTable(response.data.responsePayload.previous_search_result)
        this.setState({ noResultsToReturn: false })
      } else {
        console.log('Tagging returned an error')
        this.setState({ noResultsToReturn: true })
        this.initiateSearch()
      }
    }
    )
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
      <View style={styles.innerContainer}>
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
          searchInput={this.state.searchInput}
          existingTaggingInput={this.state.existingTaggingInput}
          searchOverallEmoResultTableData={this.state.searchOverallEmoResultTableData}
          searchArticlesResultTableData={this.state.searchArticlesResultTableData}
          noResultsToReturn={this.state.noResultsToReturn}
        />
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

export default connect(mapStateToProps)(TagLine)
