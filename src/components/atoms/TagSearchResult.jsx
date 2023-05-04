import React from 'react'
import styles from '../../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import EmoSearchOverallResultCard from '../molecules/EmoSearchOverallResultCard'
import EmoSearchBasicResultCard from '../molecules/EmoSearchBasicResultCard'

class TagSearchResult extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      noResultsToReturn: this.props.noResultsToReturn,
      searchOverallEmoResultTableData: this.props.searchOverallEmoResultTableData,
      searchArticlesResultTableData: this.props.searchArticlesResultTableData
    }
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
        </View>
    )
  }
}

export default TagSearchResult
