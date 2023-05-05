import React from 'react'
import styles from '../../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import EmoSearchOverallResultCard from '../molecules/EmoSearchOverallResultCard'
import EmoSearchBasicResultCard from '../molecules/EmoSearchBasicResultCard'
import { api } from '../../utils/backend_configuration/BackendConfig'

class TagSearchResult extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchOverallEmoResultTableData: '',
      searchArticlesResultTableData: '',
      startDateString: this.props.startDateString,
      endDateString: this.props.endDateString,
      noResultsToReturn: true
    }

    this.getTaggingResults()
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

  getTaggingResults () {
    api.post(taggingSearch, {
      username: this.props.accountData.accountData.payload.emailAddress,
      searchInput: this.state.searchInput
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data !== 'Error') {
        console.log('Tagging returned something!')
        this.populateOverallEmoResultTable(response.data)
        this.populateArticlesResultTable(response.data)
        this.setState({ noResultsToReturn: false })
      } else {
        console.log('Tagging returned an error')
        this.setState({ noResultsToReturn: true })
        this.forceUpdate()
      }
    }
    )
  }

  render () {
    return (
        <View>
          {!this.state.noResultsToReturn &&
            <Text style={styles.text}>
              From {this.state.startDateString} To {this.state.endDateString}
            </Text>
          }
          <br></br>
          {this.state.noResultsToReturn &&
            <Text style={styles.text}>
              Not enough results found! Maybe the date is too recent...
            </Text>
          }
          {!this.state.noResultsToReturn &&
          <View>
            <EmoSearchOverallResultCard resultData={this.state.searchOverallEmoResultTableData} />
            <EmoSearchBasicResultCard
              emoIcon={'😃'}
              articleData={this.state.searchArticlesResultTableData[0]}
            />
            <EmoSearchBasicResultCard
              emoIcon={'😡'}
              articleData={this.state.searchArticlesResultTableData[1]}
            />
            <EmoSearchBasicResultCard
              emoIcon={'🤢'}
              articleData={this.state.searchArticlesResultTableData[2]}
            />
            <EmoSearchBasicResultCard
              emoIcon={'😱'}
              articleData={this.state.searchArticlesResultTableData[3]}
            />
            <EmoSearchBasicResultCard
              emoIcon={'😐'}
              articleData={this.state.searchArticlesResultTableData[4]}
            />
            <EmoSearchBasicResultCard
              emoIcon={'😢'}
              articleData={this.state.searchArticlesResultTableData[5]}
            />
            <EmoSearchBasicResultCard
              emoIcon={'😯'}
              articleData={this.state.searchArticlesResultTableData[6]}
            />
          </View>
          }
        </View>
    )
  }
}

export default TagSearchResult
