import React from "react"
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from "../../utils/style_guide/AccountDetailsInputPageStyle"
import TopBar from "../molecules/TopBar"

function Completion (props) {
  return (
    <View style={styles.container}>
    <TopBar />
    <View style={styles.container}>
      <h1> Thank You & Welcome to Emotional Machines! 🎉</h1>
    </View>
    </View>
  )
}

export default Completion
