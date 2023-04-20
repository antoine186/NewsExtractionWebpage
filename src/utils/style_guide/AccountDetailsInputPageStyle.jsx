import { StyleSheet, Dimensions } from 'react-native'
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const inputViewBaseStyle = {
  backgroundColor: '#FFC0CB',
  borderRadius: 30,
  width: 8 * vw,
  height: 1.8 * vw,
  marginBottom: 0.7 * vw,
  alignItems: 'center'
}

const selectViewBaseStyle = {
  width: 8 * vw
}

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
    ...inputViewBaseStyle
  },
  textInput: {
    height: 10 * vw
  },
  textButton: {
    height: 1.5 * vw,
    marginBottom: 0
  },
  companyName: {
    height: 0.5 * vw,
    marginBottom: 50
  },
  submitBtn: {
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
  },
  titleText: {
    color: '#AD3978',
    fontSize: 1.2 * vw
  },
  rowContainer: {
    flexDirection: 'row'
  },
  dualRowInputViewLeft: {
    ...inputViewBaseStyle,
    marginRight: 1.5 * vw
  },
  selectView: {
    ...selectViewBaseStyle
  },
  rowSelectViewLeft: {
    ...selectViewBaseStyle,
    marginRight: 1.5 * vw
  },
  selectViewHighlight: {
    control: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      border: state.isFocused && 'none'
    }),
    menu: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused && 'lightgray',
      color: state.isFocused && 'black'
    })
  },
  stripeCardElement: {
    width: 15 * vw
  },
  subcontainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: '#DC143C'
  }
})

export default styles
