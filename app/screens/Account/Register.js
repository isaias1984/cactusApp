import React, { useRef } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterForm from '../../components/Account/RegisterForm'
import Toast from 'react-native-easy-toast'

export default function Register () {
  const toastRef = useRef()

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../../assets/img/cactus.jpg')}
        style={styles.logo}
        resizeMode='cover'
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast
        ref={toastRef}
        position='center'
        opacity={0.8}
        fadeInDuration={750}
        fadeOutDuration={1500}
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 200
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
})