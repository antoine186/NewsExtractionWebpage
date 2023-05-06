import React, { Component } from 'react'
import EmotionalSearchPage from './EmotionalSearchPage'
import TopBar from '../components/molecules/TopBar'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import { Navigate } from 'react-router-dom'
import styles from '../utils/style_guide/MainWebpageStyle'
import { connect } from 'react-redux'
import TaggingPage from './TaggingPage'

class LandingSwitchingPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userSessionValidated: this.props.userSession.validated,
      searchShow: true,
      tagShow: false,
      progression: false,
      linking: false
    }

    this.clearToggleChoice = this.clearToggleChoice.bind(this)
    this.toggleClickSearch = this.toggleClickSearch.bind(this)
    this.toggleClickTag = this.toggleClickTag.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.userSession !== this.props.userSession) {
      this.setState({ userSessionValidated: this.props.userSession.validated })
    }
  }

  clearToggleChoice () {
    this.setState({ searchShow: false })
    this.setState({ tagShow: false })
    this.setState({ progression: false })
    this.setState({ linking: false })
  }

  toggleClickSearch () {
    console.log('Toggling to search')
    this.clearToggleChoice()
    this.setState({ searchShow: true })
  }

  toggleClickTag () {
    console.log('Toggling to tagging')
    this.clearToggleChoice()
    this.setState({ tagShow: true })
  }

  render () {
    if (!this.state.userSessionValidated) {
      return (
        <View>
            <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
            <Navigate to='/login' />
        </View>
      )
    } else if (this.props.validSubscription.validSubscription.payload !== undefined && this.props.validSubscription.validSubscription.payload) {
      return (
        <View>
            <TopBar settingsEnabled={true} />
            <View style={styles.container}>
                <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
                <View style={styles.header}>
                  {this.state.searchShow &&
                    <Text style={styles.titleText}>Emotional Machines Search (Beta)</Text>
                  }
                  {this.state.tagShow &&
                    <Text style={styles.titleText}>Emotional Machines Tagging (Beta)</Text>
                  }
                </View>
                <ToggleButtonGroup
                    // value={alignment}
                    exclusive
                    // onChange={handleAlignment}
                >
                    <ToggleButton value="search" onClick={this.toggleClickSearch}>
                        <Image style={styles.image} source={require('../assets/images/magnifying-glass-search-icon-png-transparent.png')} />
                    </ToggleButton>
                    <ToggleButton value="tag" onClick={this.toggleClickTag}>
                        <Image style={styles.image} source={require('../assets/images/tag.jpg')} />
                    </ToggleButton>
                    <ToggleButton value="progression">
                        <Image style={styles.image} source={require('../assets/images/chart.jpg')} />
                    </ToggleButton>
                    <ToggleButton value="linking">
                        <Image style={styles.image} source={require('../assets/images/node_graph.png')} />
                    </ToggleButton>
                </ToggleButtonGroup>
                {this.state.searchShow &&
                    <EmotionalSearchPage />
                }
                {this.state.tagShow &&
                    <TaggingPage />
                }
            </View>
        </View>
      )
    } else if (this.state.userSessionValidated && this.props.validSubscription.validSubscription.payload !== undefined) {
      return (
        <View>
            <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
            <Navigate to='/payment' />
        </View>
      )
    } else {
      {this.forceUpdate()}
    }
  }
}

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
    validSubscription: state.validSubscription
  }
}

export default connect(mapStateToProps)(LandingSwitchingPage)
