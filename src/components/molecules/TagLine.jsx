import React, { Component } from 'react'

import styles from '../../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import { api } from '../../utils/backend_configuration/BackendConfig'
import TagSearchResult from '../atoms/TagSearchResult'
import { SpinnerRoundFilled } from 'spinners-react'
let {vw, vh, vmin, vmax} = require('react-native-viewport-units')

class TagLine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: this.props.searchInput,
      searchDate: this.props.searchDate,
      dayBeforeSearchDate: this.props.dayBeforeSearchDate,
      accountData: this.props.accountData,
      searchOverallEmoResultTableData: '',
      searchArticlesResultTableData: '',
      noResultsToReturn: false,
      taggingInitiated: false
    }

    console.log(this.state.accountData)

    this.setState({ taggingInitiated: true })

    api.post("", {
      username: this.props.accountData.accountData.payload.emailAddress,
      searchInput: this.state.searchInput,
      searchDate: this.state.searchDate,
      dayBeforeSearchDate: this.state.dayBeforeSearchDate,
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data !== 'Error') {
        console.log('Tagging returned something!')
        this.populateOverallEmoResultTable(response.data)
        this.populateArticlesResultTable(response.data)
      } else {
        this.setState({ noResultsToReturn: true })
        this.setState({ taggingInitiated: false })
        this.forceUpdate()
      }
    }
    )
  }

  populateOverallEmoResultTable (data) {
    const searchOverallEmoResultTableData = []

    const overallEmoResultDict = {
      overall_emo: 'Overall Emotional Engagement with Search Topic Over All Articles Found!',
      emotional_engagement: EmoEngagementStringFormatter(data.average_emo_breakdown)
    }

    searchOverallEmoResultTableData.push(overallEmoResultDict)

    this.setState({ searchOverallEmoResultTableData })
    this.setState({ tagingInitiated: false })
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
    return (
        <View>
            <View style={styles.rowContainer}>
                {!this.state.taggingInitiated &&
                <SpinnerRoundFilled
                  style={{ marginRight: 0.5 * vw }}
                  color="#B533FF"
                />
                }
                <Image
                    style={styles.image}
                    source={require('../../assets/images/red-tag.png')}
                    // href={`${window.location.origin}`}
                />
                <Text style={styles.tagText}>
                    "{this.state.searchInput}"
                </Text>
            </View>
            {!this.state.taggingInitiated &&
              <TagSearchResult
              noResultsToReturn={this.state.noResultsToReturn}
              searchOverallEmoResultTableData={this.state.searchOverallEmoResultTableData}
              searchArticlesResultTableData={this.state.searchArticlesResultTableData}
            />
            }
        </View>
    )
  }
}

export default TagLine
