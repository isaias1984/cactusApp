import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../utils/Validation'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'
import Loading from '../Loading'

function LoginForm (props) {
  const { toastRef, navigation } = props
  const [hidePassword, setHidePassword] = useState(true)
  const [isVisibleLoading, setIsVisibleLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    setIsVisibleLoading(true)

    if (!email || !password) {
      toastRef.current.show('Todos los campos son obligatorios')
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show('El email no es valido')
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate('MyAccount')
          })
          .catch(() => {
            toastRef.current.show('Email o contraseña incorretos')
          })
      }
    }
    setIsVisibleLoading(false)
  }

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder='Correo electronico'
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type='material-community'
            name='at'
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder='Contraseña'
        password
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type='material-community'
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title='Iniciar Sesión'
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={login}
      />
      <Loading text='Iniciando Sesión' visible={isVisibleLoading} />
    </View>
  )
}

export default withNavigation(LoginForm)

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  inputForm: {
    width: '100%',
    marginTop: 20
  },
  iconRight: {
    color: '#757575'
  },
  btnContainerRegister: {
    marginTop: 20,
    width: '95%'
  },
  btnRegister: {
    backgroundColor: '#689f38'
  }
})