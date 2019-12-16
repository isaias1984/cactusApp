import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'

export default function AccountOptions (props) {
  const { userInfo, setReloadData, toastRef } = props
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const menuOptions = [
    {
      title: 'Cambiar Nombre y Apellidos',
      iconType: 'material-community',
      iconNameLeft: 'account-circle',
      iconNameRight: 'chevron-right',
      iconColor: '#ccc',
      onPress: () => selectedComponent('displayName')
    },
    {
      title: 'Cambiar Email',
      iconType: 'material-community',
      iconNameLeft: 'at',
      iconNameRight: 'chevron-right',
      iconColor: '#ccc',
      onPress: () => selectedComponent('email')
    },
    {
      title: 'Cambiar Contraseña',
      iconType: 'material-community',
      iconNameLeft: 'lock-reset',
      iconNameRight: 'chevron-right',
      iconColor: '#ccc',
      onPress: () => selectedComponent('password')
    }
  ]

  const selectedComponent = key => {
    switch (key) {
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />)
        setIsVisibleModal(true)
        break
      case 'email':
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />)
        setIsVisibleModal(true)
        break
      case 'password':
        setRenderComponent(
          <ChangePasswordForm
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />)
        setIsVisibleModal(true)
        break
      default:
        break
    }
  }

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColor
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColor
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
      {renderComponent && (
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
        >
          {renderComponent}
        </Modal>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3'
  }
})