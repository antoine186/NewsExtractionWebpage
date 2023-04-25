import { StyleSheet, Dimensions } from 'react-native'
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const ScreenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 4 * vh,
    margin: 0,
    padding: 0,
    position: '-webkit-sticky',
    top: 0,
    backgroundColor: '#C576F6',
    overflow: 'visible'
  },
  image: {
    marginTop: 0.35 * vw,
    marginLeft: 0.4 * vw,
    height: 0.6 * 2 * vw,
    width: 0.6 * 2 * vw
  },
  settings: {
    marginTop: 0.35 * vw,
    marginRight: 0.4 * vw,
    float: 'right',
    height: 0.6 * 2 * vw,
    width: 0.6 * 2 * vw
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'visible'
  },
  allowOverflow: {
    overflow: 'visible'
  }
})

export default styles
