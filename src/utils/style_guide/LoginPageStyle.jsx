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
    marginBottom: 10,
    height: 6.5 * vw,
    width: 7 * vw
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: 8 * vw,
    height: 45,
    marginBottom: 20,
    alignItems: 'center'
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20
  },
  forgot_button: {
    height: 30,
    marginBottom: 30
  },
  company_name: {
    height: 10,
    marginBottom: 50
  },
  loginBtn: {
    width: 8 * vw,
    borderRadius: 25,
    height: 2 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493'
  }
})

export default styles
