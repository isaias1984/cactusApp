import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import SolucionTimer from '../../lib/SolucionTimer'

export default function UserInfo (props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading
  } = props

  const changeAvatar = async () => {
    const resultPermission = await Permissions
      .askAsync(Permissions.CAMERA_ROLL)
    const resultPermissionCamera = resultPermission.permissions.cameraRoll.status

    if (resultPermissionCamera === 'denied') {
      toastRef.current.show('Es necesario aceptar los permisos de la galeria')
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      })

      if (result.cancelled) {
        toastRef.current.show('Has cerrado la galeria sin seleccionar ninguna imagen')
      } else {
        uploadImage(result.uri, uid)
          .then(() => {
            updatePhotoUrl(uid)
          })
      }
    }
  }

  const uploadImage = async (uri, nameImage) => {
    setTextLoading('Actualizando Avatar')
    setIsLoading(true)

    const response = await fetch(uri)
    const blob = await response.blob()

    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${nameImage}`)

    return ref.put(blob)
  }

  const updatePhotoUrl = uid => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async result => {
        const update = {
          photoURL: result
        }

        await firebase
          .auth()
          .currentUser
          .updateProfile(update)

        setReloadData(true)
        setIsLoading(false)
      }).catch(() => {
        toastRef.current.show('Error al recuperar el avatar del servidor')
      })
  }

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size='large'
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL || 'https://api.adorable.io/avatars/285/abott@adorable.png'
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName || 'Anónimo'}
        </Text>
        <Text>
          {email || 'Social Login'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginTop: 30,
    marginBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: 'bold'
  }
})
