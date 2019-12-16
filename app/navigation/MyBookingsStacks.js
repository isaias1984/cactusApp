import { createStackNavigator } from 'react-navigation-stack'
import MyBookingsScreen from '../screens/Bookings/MyBookings'
import AddBookingScreen from '../screens/Bookings/AddBooking'
import BookingEditScreen from '../screens/Bookings/BookingEdit'
import BookingsScreen from '../screens/Bookings/Bookings'

export const MyBookingsScreenStacks = createStackNavigator({
  Bookings: {
    screen: BookingsScreen,
    navigationOptions: () => ({
      title: 'Reservas'
    })
  },
  MyBookings: {
    screen: MyBookingsScreen,
    navigationOptions: () => ({
      title: 'Mis Reservas'
    })
  },
  AddBooking: {
    screen: AddBookingScreen,
    navigationOptions: () => ({
      title: 'Nueva Reserva'
    })
  },
  BookingEdit: {
    screen: BookingEditScreen,
    navigationOptions: () => ({
      title: 'Editar Reserva'
    })
  }
})

export default MyBookingsScreenStacks
