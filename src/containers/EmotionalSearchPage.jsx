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

function Link (props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />
}

class EmotionalSearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchInput: '',
      dateInput: this.props.minDate,
      userSessionValidated: this.props.userSession.validated,
      minDate: this.props.minDate,
      searchArticlesResultTableData: []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    api.post(searchUrl, {
      searchInput: this.state.searchInput,
      dateInput: this.state.dateInput
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data) {
        console.log('Search returned something!')
        this.populateArticlesResultTable(response.data)
      }
    }
    )
  }

  onChange (event) {
    const selectedDate = new Date(event.target.value)
    this.setState({ dateInput: DateFormatter(selectedDate) })
  }

  populateArticlesResultTable (data) {
    console.log(data)
    const averageEmoBreakdown = data.average_emo_breakdown
    const emoBreakdownResults = data.emo_breakdown_results
    const happiestArticle = data.happiest_article
    const mostAngryArticle = data.most_angry_article
    const mostDisgustedArticle = data.most_disgusted_article
    const mostFearfulArticle = data.most_fearful_article
    const mostNeutralArticle = data.most_neutral_article
    const mostSurprisedArticle = data.most_surprised_article
    const sadestArticle = data.sadest_article

    const searchArticlesResultTableData = []

    const happiestArticleData = {
      article_category: 'Happiest Article',
      title: happiestArticle.title,
      description: happiestArticle.description,
      publisher: happiestArticle.publisher,
      published_date: happiestArticle.published_date,
      emotional_engagement: happiestArticle.emo_breakdown
    }

    searchArticlesResultTableData.push(happiestArticleData)

    this.setState({ searchArticlesResultTableData: searchArticlesResultTableData })
  }

  render () {
    if (!this.state.userSessionValidated) {
      return <Navigate to='/login' />
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Emotional Machines</Text>
          </View>
          <View class="form-group form-row">
            <View class="col-10">
              <Text style={styles.text}>
                Search Topic Emotions
              </Text>
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
              <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
                <Text style={styles.text}>SEARCH</Text>
              </TouchableOpacity>
              <SearchArticlesResultTable tableData={this.state.searchArticlesResultTableData} />
            </View>
          </View>
        </View>
      )
    }
  }
}

EmotionalSearchPage.propTypes = {
  minDate: PropTypes.string
}

EmotionalSearchPage.defaultProps = {
  minDate: '2006-01-01'
}

const mapStateToProps = state => {
  return {
    userSession: state.userSession
  }
}

export default connect(mapStateToProps)(EmotionalSearchPage)
