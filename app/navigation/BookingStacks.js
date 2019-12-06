import { createStackNavigator } from 'react-navigation-stack'
import BookingScreen from '../screens/Booking'

export const BookingScreenStacks = createStackNavigator({
  Booking: {
    screen: BookingScreen,
    navigationOptions: () => ({
      title: 'Reservar'
    })
  }
})

export default BookingScreenStacks
