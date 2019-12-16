import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import Loading from '../../components/Loading'
import UserLoged from './UserLoged'
import UserGuest from './UserGuest'

export default function MyAccount (props) {
  const [login, setLogin] = useState(null)
  
  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
      !user ? setLogin(false) : setLogin(true)
    })
  }, [])

  if (login === null) {
    return <Loading visible={false} text='Cargando...' />
  } else {
    return login ? <UserLoged /> : <UserGuest />
  }
}
