import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import LoginForm from '../../components/Account/LoginForm'
import Toast from 'react-native-easy-toast'
import LoginFacebook from '../../components/Account/LoginFacebook'

export default function Login (props) {
  const { navigation } = props
  const toastRef = useRef();
  
  return (
    <ScrollView>
      <Image
        source={require('../../../assets/img/cactus.jpg')}
        style={styles.logo}
        resizeMode='cover'
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
      </View>
      <Toast
        ref={toastRef}
        position='center'
        opacity={0.8}
        fadeInDuration={750}
        fadeOutDuration={1500}
      />
    </ScrollView>
  )
}

function CreateAccount (props) {
  const { navigation } = props

  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta? {''}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate('Register')}
      >
        Registrate
      </Text>
    </Text>
  )
}  

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 180
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: '#689f38',
    fontWeight: 'bold'
  },
  divider: {
    backgroundColor: '#689f38',
    margin: 15

  }
})
