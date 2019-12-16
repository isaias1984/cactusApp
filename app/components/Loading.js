import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading (props) {
  const { visible, text } = props

  return (
    <Overlay
      isVisible={visible}
      windowBackgroundColor='rgba(0, 0, 0, .5)'
      overlayBackgroundColor='transparent'
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size='large' color='#689f38' />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: '#fff',
    borderColor: '#689f38',
    borderWidth: 2,
    borderRadius: 10
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#689f38',
    textTransform: 'uppercase',
    marginTop: 10
  }
})
