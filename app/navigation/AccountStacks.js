import { createStackNavigator } from 'react-navigation-stack'
import MyAccountScreen from '../screens/MyAccount/MyAccount'

export const AccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: 'Mi Cuenta'
    })
  }
})

export default AccountScreenStacks
