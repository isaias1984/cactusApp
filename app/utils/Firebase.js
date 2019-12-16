import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDD3axALI9NYb_QrX7xOEptMqLAQn7uULo",
    authDomain: "cactusrestore.firebaseapp.com",
    databaseURL: "https://cactusrestore.firebaseio.com",
    projectId: "cactusrestore",
    storageBucket: "cactusrestore.appspot.com",
    messagingSenderId: "684036832790",
    appId: "1:684036832790:web:9e0136efc08271b2e6bf37"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
