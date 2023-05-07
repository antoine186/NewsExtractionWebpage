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
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  titleText: {
    color: '#AD3978',
    fontSize: 1.2 * vw
  },
  text: {
    lineHeight: 1 * vw,
    fontSize: 0.8 * vw,
    marginVertical: 1 * vw,
    textAlign: 'center'
  },
  tagText: {
    lineHeight: 1 * vw,
    fontSize: 0.8 * vw,
    marginVertical: 1 * vw,
    marginLeft: 1 * vw,
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
  },
  image: {
    marginBottom: 0.5 * vw,
    height: 2.5 * vw,
    width: 2.5 * vw
  },
  articleCard: {
    marginBottom: 0.5 * vw,
    width: 25 * vw
  },
  titleText2: {
    color: '#AD3978',
    fontSize: 0.8 * vw
  },
  rowContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    overflow: 'visible',
    alignContent: 'center'
  },
  imageTag: {
    marginBottom: 0.5 * vw,
    width: 3.5 * vw,
    height: '100%'
  },
  chartCard: {
    marginBottom: 0.5 * vw,
    width: 35 * vw
  }
})

export default styles
