import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateDate } from '../../utils/Validation'
import { transformDate } from '../../utils/Transformations'
import Loading from '../../components/Loading'
import NumericInput from 'react-native-numeric-input'
import DateTimePicker from "react-native-modal-datetime-picker"

import { firebasApp } from '../../utils/Firebase'
import firebase from 'firebase'
import 'firebase/firestore'
const db = firebase.firestore(firebasApp)

export default function BookingEdit (props) {
  const { booking } = props.navigation.state.params.booking.item
  const { toastRef, setIsReloadBookings } = props.navigation.state.params
  
  const { navigation } = props
  const [name, setName] = useState(booking.nombre)
  const [formDate, setFormDate] = useState(booking.fecha)
  const [date, setDate] = useState(new Date(booking.fecha))
  const [isVisibleDTP, setIsVisibleDTP] = useState(false)
  const [surname, setSurname] = useState(booking.apellidos)
  const [diners, setDiners] = useState(booking.comensales)
  const [isVisibleLoading, setIsVisibleLoading] = useState(false)
  const [error, setError] = useState({})

  const editBooking = async () => {

    if (!date || !name || !surname || !diners) {
      const objError = {}

      !date && (objError.date = 'Fecha no puede estar vacia')
      !name && (objError.name = 'Nombre no puede estar vacio')
      !surname && (objError.surname = 'Apellido no puede estar vacio')

      setError(objError)
    } else {
       if (!validateDate(date)) {
        toastRef.current.show('La fecha no puede ser anterior a hoy')
      } else {
        bookingUpdate = {
          fecha: transformDate(date),
          nombre: name,
          apellidos: surname,
          comensales: diners,
          estado: 'pendiente',
          createAt: new Date(),
          createBy: firebase.auth().currentUser.uid
        }
        setIsVisibleLoading(true)
        db.collection('bookings')
          .doc(booking.id)
          .update(bookingUpdate)
          .then(() => {
          setIsVisibleLoading(false)
          setIsReloadBookings(true) 
          navigation.navigate('MyBookings')
        }).catch(() => {
          setIsVisibleLoading(false)
          toastRef.current.show('Error al editar la reserva, inténtelo más tarde')
        }) 
        }
      } 
  }

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder='Fecha'
        value={formDate}
        containerStyle={styles.inputForm}
        onChange={() => setIsVisibleDTP(true)}
        rightIcon={
          <Icon
            type='material-community'
            name='calendar-edit'
            iconStyle={styles.iconRight}
            onPress={() => setIsVisibleDTP(true)}
          />
        }
        errorMessage={error.date}
      />
      <Input
        placeholder='Nombre'
        value={name}
        containerStyle={styles.inputForm}
        onChange={e => setName(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type='material-community'
            name='text'
            iconStyle={styles.iconRight}
          />
        }
        errorMessage={error.name}
      />
      <Input
        placeholder='Apellidos'
        value={surname}
        containerStyle={styles.inputForm}
        onChange={e => setSurname(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type='material-community'
            name='text'
            iconStyle={styles.iconRight}
          />
        }
        errorMessage={error.surname}
      />
      <Text style={styles.numericInputText}>Comensales</Text>
      <NumericInput 
        value={diners} 
        onChange={setDiners}
        minValue={1} 
        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
        totalWidth={240} 
        totalHeight={40} 
        iconSize={25}
        step={1}
        valueType='integer'
        rounded 
        iconStyle={{ color: 'white' }} 
        rightButtonBackgroundColor='#636363' 
        leftButtonBackgroundColor='#9c9c9c'
        containerStyle={styles.numericInput}
      />
      <Button
        title='Editar'
        containerStyle={styles.btnContaineraddNewBooking}
        buttonStyle={styles.btnaddNewBooking}
        onPress={editBooking}
      />
      <DateTimePicker
        isVisible={isVisibleDTP}
        onConfirm={e => {
          setFormDate(transformDate(e))
          setDate(e)
          setIsVisibleDTP(false)
        }}
        onCancel={() => {
          setIsVisibleDTP(false)
        }}
        mode='date'
      />
      <Loading text='Editando Reserva' visible={isVisibleLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputForm: {
    width: '90%',
    marginTop: 30
  },
  iconRight: {
    color: '#757575'
  },
  btnContaineraddNewBooking: {
    marginTop: 50,
    width: '90%'
  },
  btnaddNewBooking: {
    backgroundColor: '#689f38'
  },
  numericInput: {
    marginTop: 20
  },
  numericInputText: {
    marginTop: 30,
    fontSize: 18,
    color: '#c1c1c1'
  }
})