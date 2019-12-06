import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDsVhudFKTRlvTFNnppsv4vMS8H9MJ6jAs',
  authDomain: 'cactus-project-b12cf.firebaseapp.com',
  databaseURL: 'https://cactus-project-b12cf.firebaseio.com',
  projectId: 'cactus-project-b12cf',
  storageBucket: 'cactus-project-b12cf.appspot.com',
  messagingSenderId: '341730773134',
  appId: '1:341730773134:web:e66f180fc7bcc4270421df',
  measurementId: 'G-8H3Q79T4RS'
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
