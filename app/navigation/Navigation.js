import React from 'react'
import { Icon } from 'react-native-elements'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import AccountScreenStacks from './AccountStacks'
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
            name='account-circle'
            size={30}
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
            name='calendar'
            size={30}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'MyBookings',
    order: ['Account', 'MyBookings'],
    tabBarOptions: {
      inactiveTintColor: '#757575',
      activeTintColor: '#689f38'
    }
  }
)

export default createAppContainer(NavigationStacks)
