import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit'
import styles from '../../utils/style_guide/TopBarStyle'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

export default function TopBar () {
  return (
    <View style={styles.container}>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='#'>
            <Image
                style={styles.image}
                source={require('../../assets/images/EMOfficialLogo.png')}
                href={`${window.location.origin}`}
            />
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </View>
  )
}