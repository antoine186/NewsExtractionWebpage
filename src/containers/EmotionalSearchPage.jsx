import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import PairedDatePickers from '../components/molecules/PairedDatePickers'
import styles from '../utils/style_guide/MainWebpageStyle'

function Link (props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />
}

function EmotionalSearchPage () {
  const [value, onChangeText] = React.useState('Search')

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
  )
}

export default EmotionalSearchPage
