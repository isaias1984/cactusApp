import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'
import { reauthenticate } from '../../utils/Api'

export default function ChangePasswordForm (props) {
  const { setIsVisibleModal, toastRef } = props
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [hideNewPassword, setHideNewPassword] = useState(true)
  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true)

  const updatePassword = () => {
    setError({})

    if (!password || !newPassword || !newPasswordRepeat) {
      const objError = {}

      !password && (objError.password = 'No puede estar vacío.')
      !newPassword && (objError.newPassword = 'No puede estar vacío.')
      !newPasswordRepeat && (objError.newPasswordRepeat = 'No puede estar vacío.')

      setError(objError)
    } else {
      if (newPassword !== newPasswordRepeat) {
        setError({
          newPassword: 'Las nuevas contraseñas tienen que ser iguales',
          newPasswordRepeat: 'Las nuevas contraseñas tienen que ser iguales'
        })
      } else {
        setIsLoading(true)
        reauthenticate(password).then(() => {
          firebase.auth().currentUser.updatePassword(newPassword).then(() => {
            setIsLoading(false)
            toastRef.current.show('Contraseña actualizada correctamente')
            setIsVisibleModal(false)
            firebase.auth().signOut()
          }).catch(() => {
            toastRef.current.show('Error al actualizar la contraseña')
            setIsLoading(false)
          })
        }).catch(() => {
          setError({ password: 'La contraseña no es correcta.' })
          setIsLoading(false)
        })
      }
    }
  }

  return (
    <View style={styles.view}>
      <Input
        placeholder='Contraseña'
        containerStyle={styles.input}
        password
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hidePassword ? 'eye-outline' : 'eye-off-outline',
          color: '#757575',
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={error.password}
      />
      <Input
        placeholder='Nueva Contraseña'
        containerStyle={styles.input}
        password
        secureTextEntry={hideNewPassword}
        onChange={e => setNewPassword(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hideNewPassword ? 'eye-outline' : 'eye-off-outline',
          color: '#757575',
          onPress: () => setHideNewPassword(!hideNewPassword)
        }}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder='Repite Nueva Contraseña'
        containerStyle={styles.input}
        password
        secureTextEntry={hideNewPasswordRepeat}
        onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hideNewPasswordRepeat ? 'eye-outline' : 'eye-off-outline',
          color: '#757575',
          onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
        }}
        errorMessage={error.newPasswordRepeat}
      />
      <Button
        title='Cambiar contraseña'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updatePassword}
        loading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: '95%'
  },
  btn: {
    backgroundColor: '#689f38'
  }
})
