import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import AddBookingForm from '../../components/Bookings/AddBookingForm'

export default function AddRestaurant (props) {
  const { navigation } = props
  const { setIsReloadBookings } = navigation.state.params
  const toastRef = useRef()
  const [isLoading, setisLoading] = useState(false)

  return (
    <View>
      <AddBookingForm
        toastRef={toastRef}
        navigation={navigation}
        setisLoading={setisLoading}
        setIsReloadBookings={setIsReloadBookings}
      />

      <Toast ref={toastRef} position='center' opacity={0.8} />
      <Loading visible={isLoading} text='Creando Reserva' />
    </View>
  )
}