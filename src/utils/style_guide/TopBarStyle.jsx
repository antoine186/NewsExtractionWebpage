import { StyleSheet, Dimensions } from 'react-native'
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const ScreenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 4 * vh,
    margin: 0,
    // marginLeft: 2 * vw,
    // marginTop: 3 * vh,
    padding: 0,
    position: '-webkit-sticky',
    // position: 'sticky',
    top: 0,
    backgroundColor: '#C576F6'
  },
  image: {
    marginTop: 0.35 * vw,
    marginLeft: 0.4 * vw,
    height: 0.6 * 2 * vw,
    width: 0.6 * 2 * vw
  }
})

export default styles
