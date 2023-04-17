import { StyleSheet, Dimensions } from 'react-native'
let {vw, vh, vmin, vmax} = require('react-native-viewport-units')

const ScreenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    marginBottom: 0.5 * vw,
    height: 6.5 * vw,
    width: 7 * vw
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: 8 * vw,
    height: 1.8 * vw,
    marginBottom: 0.7 * vw,
    alignItems: 'center'
  },
  textInput: {
    height: 10 * vw,
    flex: 1,
    padding: 0.5 * vw,
    marginLeft: 1 * vw
  },
  textButton: {
    height: 1.5 * vw,
    marginBottom: 0
  },
  companyName: {
    height: 0.5 * vw,
    marginBottom: 50
  },
  loginBtn: {
    width: 8 * vw,
    borderRadius: 25,
    height: 2 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2 * vw,
    backgroundColor: '#FF1493'
  },
  text: {
    color: '#AD3978',
    fontSize: 0.7 * vw
  }
})

export default styles
