import React, { useLayoutEffect, Component, useEffect } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import { Navigate } from 'react-router-dom'
import PairedDatePickers from '../components/molecules/PairedDatePickers'
import styles from '../utils/style_guide/MainWebpageStyle'
import CookieSessionChecker from '../utils/CookiesSessions/CookieSessionChecker'
import { useSelector, connect } from 'react-redux'

function Link (props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />
}

class EmotionalSearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchInput: ''
    }

    const someData = this.props.xyz
    console.log(someData)

    /*
    trySelector () {
      const userSession = useSelector(state => state.userSession)
    }

    trySelector() */
    // console.log(userSession)

    if (CookieSessionChecker()) {
      console.log('Session confirmed')
    } else {
      console.log('Session absent')
    }
  }

  render () {
    return <Navigate to='/login' />
  }

  /*
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emotional Machines</Text>
      </View>
      <View class="form-group form-row">
            <View class="col-10">
              <Text style={styles.text}>
                Find Emotions
              </Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={text => onChangeText(text)}
                value={value}
                style={{ padding: 10, borderWidth: 2, borderColor: '#BC2BEA' }}
              />
              <br></br>
              <PairedDatePickers />
            </View>
      </View>
    </View>
  ) */
}

const mapStateToProps = state => {
  return {
    xyz: state
  }
}

export default connect(mapStateToProps)(EmotionalSearchPage)

// export default EmotionalSearchPage
