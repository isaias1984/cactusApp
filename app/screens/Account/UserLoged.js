import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import * as firebase from 'firebase'
import UserInfo from '../../components/Account/UserInfo'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import AccountOptions from '../../components/Account/AccountOptions'

export default function UserLogged () {
  const [userInfo, setUserInfo] = useState({})
  const [reloadData, setReloadData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [textLoading, setTextLoading] = useState('')
  const toastRef = useRef()

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser
      setUserInfo(user.providerData[0])
    })()
    setReloadData(false)
  }, [reloadData])

  return (
    <View style={styles.viewUserInfo}>
      <UserInfo
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <AccountOptions 
        userInfo={userInfo} 
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Button
        title='Cerrar sesión'
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast
        ref={toastRef}
        position='center'
        opacity={0.8}
        fadeInDuration={750}
        fadeOutDuration={1500}
      />
      <Loading
        text={textLoading}
        visible={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: '100%',
    backgroundColor: '#f2f2f2'
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: '#00a680'
  }

})

