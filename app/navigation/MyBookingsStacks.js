import { createStackNavigator } from 'react-navigation-stack'
import MyBookingsScreen from '../screens/MyBookings'

export const MyBookingsScreenStacks = createStackNavigator({
  MyBookings: {
    screen: MyBookingsScreen,
    navigationOptions: () => ({
      title: 'Mis Reservas'
    })
  }
})

export default MyBookingsScreenStacks
