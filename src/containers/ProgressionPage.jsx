import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import styles from '../utils/style_guide/MainWebpageStyle'
import { api, progressionCharting, getPreviousCharting } from '../utils/backend_configuration/BackendConfig'
import EmoProgressionCard from '../components/molecules/EmoProgressionCard'
import { connect } from 'react-redux'
import DateFormatter from '../utils/DateFormatter'

class ProgressionPage extends Component {
  constructor (props) {
    super(props)

    const relevantDate = new Date()

    relevantDate.setDate(relevantDate.getDate() - 1)
    // const yesterdayString = DateFormatterForUI(relevantDate)
    const yesterday = DateFormatter(relevantDate)

    this.state = {
      searchInput: '',
      angerProgressionData: [],
      disgustProgressionData: [],
      fearProgressionData: [],
      joyProgressionData: [],
      neutralProgressionData: [],
      sadnessProgressionData: [],
      surpriseProgressionData: [],
      progressionDates: [],
      dateInput: yesterday
    }

    api.post(getPreviousCharting, {
      username: this.props.accountData.accountData.payload.emailAddress
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data.operation_success) {
        console.log('Retrieved previous charting')
        let newAngerProgressionData = []
        newAngerProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.average_emo_breakdown.anger_percentage)
        newAngerProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.average_emo_breakdown.anger_percentage)
        newAngerProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.average_emo_breakdown.anger_percentage)
        newAngerProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.average_emo_breakdown.anger_percentage)
        newAngerProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.average_emo_breakdown.anger_percentage)
        newAngerProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.average_emo_breakdown.anger_percentage)
        newAngerProgressionData = newAngerProgressionData.reverse()

        let newDisgustProgressionData = []
        newDisgustProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.average_emo_breakdown.disgust_percentage)
        newDisgustProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.average_emo_breakdown.disgust_percentage)
        newDisgustProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.average_emo_breakdown.disgust_percentage)
        newDisgustProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.average_emo_breakdown.disgust_percentage)
        newDisgustProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.average_emo_breakdown.disgust_percentage)
        newDisgustProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.average_emo_breakdown.disgust_percentage)
        newDisgustProgressionData = newDisgustProgressionData.reverse()

        let newFearProgressionData = []
        newFearProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.average_emo_breakdown.fear_percentage)
        newFearProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.average_emo_breakdown.fear_percentage)
        newFearProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.average_emo_breakdown.fear_percentage)
        newFearProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.average_emo_breakdown.fear_percentage)
        newFearProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.average_emo_breakdown.fear_percentage)
        newFearProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.average_emo_breakdown.fear_percentage)
        newFearProgressionData = newFearProgressionData.reverse()

        let newJoyProgressionData = []
        newJoyProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.average_emo_breakdown.joy_percentage)
        newJoyProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.average_emo_breakdown.joy_percentage)
        newJoyProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.average_emo_breakdown.joy_percentage)
        newJoyProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.average_emo_breakdown.joy_percentage)
        newJoyProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.average_emo_breakdown.joy_percentage)
        newJoyProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.average_emo_breakdown.joy_percentage)
        newJoyProgressionData = newJoyProgressionData.reverse()

        let newNeutralProgressionData = []
        newNeutralProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.average_emo_breakdown.neutral_percentage)
        newNeutralProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.average_emo_breakdown.neutral_percentage)
        newNeutralProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.average_emo_breakdown.neutral_percentage)
        newNeutralProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.average_emo_breakdown.neutral_percentage)
        newNeutralProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.average_emo_breakdown.neutral_percentage)
        newNeutralProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.average_emo_breakdown.neutral_percentage)
        newNeutralProgressionData = newNeutralProgressionData.reverse()

        let newSadnessProgressionData = []
        newSadnessProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.average_emo_breakdown.sadness_percentage)
        newSadnessProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.average_emo_breakdown.sadness_percentage)
        newSadnessProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.average_emo_breakdown.sadness_percentage)
        newSadnessProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.average_emo_breakdown.sadness_percentage)
        newSadnessProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.average_emo_breakdown.sadness_percentage)
        newSadnessProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.average_emo_breakdown.sadness_percentage)
        newSadnessProgressionData = newSadnessProgressionData.reverse()

        let newSurpriseProgressionData = []
        newSurpriseProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.average_emo_breakdown.surprise_percentage)
        newSurpriseProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.average_emo_breakdown.surprise_percentage)
        newSurpriseProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.average_emo_breakdown.surprise_percentage)
        newSurpriseProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.average_emo_breakdown.surprise_percentage)
        newSurpriseProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.average_emo_breakdown.surprise_percentage)
        newSurpriseProgressionData.push(response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.average_emo_breakdown.surprise_percentage)
        newSurpriseProgressionData = newSurpriseProgressionData.reverse()

        let newProgressionDates = []
        newProgressionDates.push({month: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.emo_month, year: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.emo_year})
        newProgressionDates.push({month: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.emo_month, year: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_2.emo_year})
        newProgressionDates.push({month: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.emo_month, year: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_3.emo_year})
        newProgressionDates.push({month: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.emo_month, year: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_4.emo_year})
        newProgressionDates.push({month: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.emo_month, year: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_5.emo_year})
        newProgressionDates.push({month: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.emo_month, year: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_6.emo_year})
        newProgressionDates = newProgressionDates.reverse()

        this.setState({ angerProgressionData: newAngerProgressionData })
        this.setState({ disgustProgressionData: newDisgustProgressionData })
        this.setState({ fearProgressionData: newFearProgressionData })
        this.setState({ joyProgressionData: newJoyProgressionData })
        this.setState({ neutralProgressionData: newNeutralProgressionData })
        this.setState({ sadnessProgressionData: newSadnessProgressionData })
        this.setState({ surpriseProgressionData: newSurpriseProgressionData })

        this.setState({ progressionDates: newProgressionDates })

        this.setState({ searchInput: response.data.responsePayload.previous_chart_result.emo_breakdown_result_metadata_1.search_input })
      } else {
        console.log('Retrieving previous charting failed')
      }
    }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()

    api.post(progressionCharting, {
      searchInput: this.state.searchInput,
      dateInput: this.state.dateInput,
      username: this.props.accountData.accountData.payload.emailAddress
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data.operation_success) {
        console.log('Charting succeeded')
        const newProgressionData = []
        newProgressionData.push(response.data.responsePayload.emo_breakdown_result_metadata_dict.emo_breakdown_result_metadata_1)
        newProgressionData.push(response.data.responsePayload.emo_breakdown_result_metadata_dict.emo_breakdown_result_metadata_2)
        newProgressionData.push(response.data.responsePayload.emo_breakdown_result_metadata_dict.emo_breakdown_result_metadata_3)
        newProgressionData.push(response.data.responsePayload.emo_breakdown_result_metadata_dict.emo_breakdown_result_metadata_4)
        newProgressionData.push(response.data.responsePayload.emo_breakdown_result_metadata_dict.emo_breakdown_result_metadata_5)
        newProgressionData.push(response.data.responsePayload.emo_breakdown_result_metadata_dict.emo_breakdown_result_metadata_6)

        this.setState({ progressionData: newProgressionData })
      } else {
        console.log('Charting failed')
      }
    }
    )
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
                    {true &&
                        <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
                            <Text style={styles.text}>CHART</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <br></br>
            {true &&
                <View style={styles.innerContainer}>
                    <br></br>
                    {true &&
                      <Text style={styles.titleText2}>
                        Emotional Progression Charts
                      </Text>
                    }
                    <br></br>
                    <br></br>
                    {true &&
                        <View>
                            <EmoProgressionCard
                                progressionDataLine={this.state.joyProgressionData}
                                progressionDates={this.state.progressionDates}
                                progressionEmoIcon={'😃'}
                            />
                            <EmoProgressionCard
                                progressionDataLine={this.state.angerProgressionData}
                                progressionDates={this.state.progressionDates}
                                progressionEmoIcon={'😡'}
                            />
                            <EmoProgressionCard
                                progressionDataLine={this.state.neutralProgressionData}
                                progressionDates={this.state.progressionDates}
                                progressionEmoIcon={'😐'}
                            />
                            <EmoProgressionCard
                                progressionDataLine={this.state.fearProgressionData}
                                progressionDates={this.state.progressionDates}
                                progressionEmoIcon={'😱'}
                            />
                            <EmoProgressionCard
                                progressionDataLine={this.state.surpriseProgressionData}
                                progressionDates={this.state.progressionDates}
                                progressionEmoIcon={'😯'}
                            />
                            <EmoProgressionCard
                                progressionDataLine={this.state.sadnessProgressionData}
                                progressionDates={this.state.progressionDates}
                                progressionEmoIcon={'😢'}
                            />
                            <EmoProgressionCard
                                progressionDataLine={this.state.disgustProgressionData}
                                progressionDates={this.state.progressionDates}
                                progressionEmoIcon={'🤢'}
                            />
                          <br></br>
                        </View>
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

export default connect(mapStateToProps)(ProgressionPage)
