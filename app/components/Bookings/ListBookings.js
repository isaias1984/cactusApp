import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Divider, Icon, Button } from 'react-native-elements'
import * as firebase from 'firebase'

export default function ListBookings (props) {
  const { bookings, isLoading, handleLoadMore, navigation, toastRef, setIsReloadBookings} = props

  return (
    <View>
      {bookings ? (
        <FlatList
          data={bookings}
          renderItem={booking => 
          <Booking 
            booking={booking} 
            navigation={navigation} 
            toastRef={toastRef}
            setIsReloadBookings={setIsReloadBookings}
          />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loadingBookings}>
          <ActivityIndicator size='large' />
          <Text>Cargando reservas</Text>
        </View>
      )}
    </View>
  )
}

function Booking (props) {
  const { booking, navigation, toastRef, setIsReloadBookings } = props
  const { fecha, nombre, apellidos, comensales, estado } = booking.item.booking

  return (
    <TouchableOpacity onPress={() => navigation.navigate('BookingEdit', { booking, toastRef, setIsReloadBookings})}>
      <View style={styles.viewBooking}>
          <Icon
            type='material-community'
            name='account'
            iconStyle={styles.iconLeft}
          />
          <Text style={styles.bookingName}>{nombre + ' ' + apellidos}</Text>
      </View>
      <View style={styles.viewBooking}>
          <Icon
            type='material-community'
            name='calendar'
            iconStyle={styles.iconLeft}
          />
          <Text style={styles.bookingDate}>{fecha}</Text>
      </View>
      <View style={styles.viewBooking}>
        <Text style={styles.state}>Estado: </Text>
        <Text style={styles.stateText}>{estado}</Text>
        <Icon
        type='material-community'
        name='chevron-right'
        iconStyle={styles.iconRight}
        size={30}
        />
      </View>
      <Divider style={{ backgroundColor: 'blue' }} />
    </TouchableOpacity>
  )
}

function FooterList (props) {
  const { isLoading } = props

  if (isLoading) {
    return (
      <View style={styles.loadingBookings}>
        <ActivityIndicator size='large' />
      </View>
    )
  } else {
    return (
      <View style={styles.notFoundBookings}>
        <Text>No quedan reservas por cargar</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingBookings: {
    marginTop: 20,
    alignItems: 'center'
  },
  viewCol: {
    flexDirection: 'column'
  },
  viewBooking: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20
  },
  bookingDate: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20
  },
  bookingName: {
    paddingTop: 2,
    fontSize: 20,
    color: 'grey',
    marginLeft: 20
  },
  diners: {
    paddingTop: 2,
    color: 'green',
    fontSize: 20
  },
  state: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  },
  stateText: {
    color: 'red',
    fontSize: 20,
    textTransform: 'uppercase',
    marginRight: 40
  },
  loaderBookings: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundBookings: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  iconLeft: {
    color: '#757575'
  },
  iconRight: {
    color: '#689f38',
    marginLeft: 20
  }
})
