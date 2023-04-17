import { StyleSheet, Dimensions } from 'react-native'
let {vw, vh, vmin, vmax} = require('react-native-viewport-units')

const ScreenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: Dimensions.get('window').width
  },
  header: {
    padding: 1 * vw
  },
  title: {
    fontWeight: 'bold',
    fontSize: 1.2 * vw,
    marginVertical: 1.2 * vw,
    textAlign: 'center'
  },
  text: {
    lineHeight: 1 * vw,
    fontSize: 0.8 * vw,
    marginVertical: 1 * vw,
    textAlign: 'center'
  },
  link: {
    color: '#1B95E0'
  },
  code: {
    fontFamily: 'monospace, monospace'
  },
  searchBtn: {
    width: 8 * vw,
    borderRadius: 25,
    height: 2 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2 * vw,
    backgroundColor: '#FF1493'
  }
})

export default styles
