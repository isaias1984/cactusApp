import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigation from './app/navigation/Navigation'
import { firebaseApp } from './app/utils/Firebase'

export default function App () {
  return <Navigation />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
