import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import Loading from '../../components/Loading'
import UserGuest from '../../screens/Account/UserGuest'
import MyBookings from './MyBookings'

export default function Bookings (props) {
  const { navigation } = props
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
    return login ? <MyBookings navigation={navigation} /> : <UserGuest />
  }
}