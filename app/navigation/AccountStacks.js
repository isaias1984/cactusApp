import { createStackNavigator } from 'react-navigation-stack'
import MyAccountScreen from '../screens/Account/MyAccount'
import LoginScreen from '../screens/Account/Login'
import RegisterScreen from '../screens/Account/Register'
import UserLogedScreen from '../screens/Account/UserLoged'

export const AccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: 'Cuenta'
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: 'Login'
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: 'Registro'
    })
  },
  UserLoged: {
    screen: UserLogedScreen,
    navigationOptions: () => ({
      title: 'Mi Cuenta'
    })
  }
})

export default AccountScreenStacks
