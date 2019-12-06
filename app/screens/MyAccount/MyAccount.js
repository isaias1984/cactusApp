import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import { View, Text } from 'react-native'
import Loading from '../../components/Loading'
import UserLogged from './UserLogged'
import Logging from './Logging'

export default function MyAccount () {
  const [login, setLogin] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? 
      setLogin(false) : setLogin(true)
    })
  }, [])

  if (login === null) {
    return <Loading visible={false} text='Cargando...' />
  }

  return login ? <UserLogged /> : <Logging />
}
