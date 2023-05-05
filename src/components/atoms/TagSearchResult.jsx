import React from 'react'
import styles from '../../utils/style_guide/MainWebpageStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import EmoSearchOverallResultCard from '../molecules/EmoSearchOverallResultCard'
import EmoSearchBasicResultCard from '../molecules/EmoSearchBasicResultCard'
import { connect } from 'react-redux'

class TagSearchResult extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchOverallEmoResultTableData: this.props.searchOverallEmoResultTableData,
      searchArticlesResultTableData: this.props.searchArticlesResultTableData,
      startDateString: this.props.startDateString,
      endDateString: this.props.endDateString,
      noResultsToReturn: this.props.noResultsToReturn,
      searchInput: this.props.searchInput,
      existingTaggingInput: this.props.existingTaggingInput
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.searchOverallEmoResultTableData !== this.props.searchOverallEmoResultTableData) {
      console.log(searchOverallEmoResultTableData)
      this.setState({ searchOverallEmoResultTableData: this.props.searchOverallEmoResultTableData })
    }
    if (prevProps.searchArticlesResultTableData !== this.props.searchArticlesResultTableData) {
      this.setState({ searchArticlesResultTableData: this.props.searchArticlesResultTableData })
    }
  }

  render () {
    return (
        <View style={styles.innerContainer}>
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
          </View>
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
