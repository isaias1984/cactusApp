import React from 'react'
import { Icon } from 'react-native-elements'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import AccountScreenStacks from './AccountStacks'
import BookingScreenStacks from './BookingStacks'
import MyBookingsScreenStacks from './MyBookingsStacks'

const NavigationStacks = createBottomTabNavigator(
  {
    Account: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: 'Cuenta',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='material-community'
            name='home-outline'
            size={40}
            color={tintColor}
          />
        )
      })
    },
    Booking: {
      screen: BookingScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: 'Reservar',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='material-community'
            name='book-plus'
            size={40}
            color={tintColor}
          />
        )
      })
    },
    MyBookings: {
      screen: MyBookingsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: 'Mis Reservas',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='material-community'
            name='book-multiple'
            size={40}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'Account',
    order: ['Account', 'Booking', 'MyBookings'],
    tabBarOptions: {
      inactiveTintColor: '#757575',
      activeTintColor: '#689f38'
    }
  }
)

export default createAppContainer(NavigationStacks)
