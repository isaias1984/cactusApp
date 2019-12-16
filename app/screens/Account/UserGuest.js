import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

function UserGuest (props) {
  const { navigation } = props

  return (
    <ScrollView style={styles.viewBody} centerContent>
      <Image
        source={require('../../../assets/img/restaurant.jpg')}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.title}>
        Consulta tu perfil de Restaurante Cactus
      </Text>
      <Text style={styles.description}>
      Si quieres divertirte, comiendo en un restaurante excelente,
      con música ambiente en directo  y buena comida, este es tu Restuarante. 
      ¡Haz tu reserva ya!
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title='Ver tu perfil'
          onPress={() => {
            navigation.navigate('Login')
          }}
        />
      </View>
    </ScrollView>
  )
}

export default withNavigation(UserGuest)

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 40
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    marginBottom: 20
  },
  viewBtn: {
    flex: 1,
    alignItems: 'center'
  },
  btnStyle: {
    backgroundColor: '#689f38'
  },
  btnContainer: {
    width: '70%'
  }
})
