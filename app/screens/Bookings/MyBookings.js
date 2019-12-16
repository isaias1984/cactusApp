import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import ActionButton from 'react-native-action-button'
import ListBookings from '../../components/Bookings/ListBookings'
import Toast from 'react-native-easy-toast'

import Loading from '../../components/Loading'

import { firebaseApp } from '../../utils/Firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
const db = firebase.firestore(firebaseApp)

export default function MyBookings (props) {
  const { navigation } = props
  const toastRef = useRef()
  const [bookings, setBookings] = useState([])
  const [startBookings, setStartBookings] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [totalBookings, setTotalBookings] = useState(0)
  const [isReloadBookings, setIsReloadBookings] = useState(false)
  const limitBookings = 5

  useEffect(() => {
    db.collection('bookings')
      .get()
      .then(snap => {
        setTotalBookings(snap.size)
      });
    
    (async () => {
      const resultBooking = []
      const bookings = db
        .collection('bookings')
        .orderBy('createAt', 'desc')
        .limit(limitBookings)

      await bookings.get().then(response => {
        setStartBookings(response.docs[response.docs.length - 1])

        response.forEach(doc => {
          const booking = doc.data()
          booking.id = doc.id
          resultBooking.push({ booking })
        })

        setBookings(resultBooking)
      })
    })()
    setIsReloadBookings(false)
  }, [isReloadBookings])

  const handleLoadMore = async () => {
    const resultBookings = []
    bookings.length < totalBookings && setIsLoading(true)

    const bookingsDb = db
      .collection('bookings')
      .orderBy('createAt', 'desc')
      .startAfter(startBookings
        .data().createAt)
      .limit(limitBookings)

    await bookingsDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartBookings(response.docs[response.docs.length - 1])
      } else {
        setIsLoading(false)
      }

      response.forEach(doc => {
        const booking = doc.data()
        booking.id = doc.id
        resultBookings.push({ booking })
      })

      setBookings([...bookings, ...resultBookings])
    })
    setIsLoading(false)
  } 

  
      //Filtramos los datos por usuario
    const userUid = firebase.auth().currentUser.uid

    const userBookings = bookings.filter(book => {
      return book.booking.createBy === userUid
    })

    return (
      <View style={styles.viewBody}>
        <ListBookings
          bookings={userBookings}
          isLoading={isLoading}
          handleLoadMore={handleLoadMore}
          navigation={navigation}
          toastRef={toastRef}
          setIsReloadBookings={setIsReloadBookings}
        />
        <AddBookingButton navigation={navigation} setIsReloadBookings={setIsReloadBookings}/>
        <Toast
          ref={toastRef}
          position='center'
          opacity={0.8}
          fadeInDuration={750}
          fadeOutDuration={1500}
        />
      </View>
    )
}

function AddBookingButton (props) {
  const { navigation, setIsReloadBookings } = props

  return (
    <ActionButton
      buttonColor='#689f38'
      onPress={() => navigation.navigate('AddBooking', {setIsReloadBookings})}
    />
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
})