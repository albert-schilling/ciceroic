import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyBEQMRpOhWfQ2kk4gGUh-bEFZNwY_gHM70',
  authDomain: 'ciceroic.firebaseapp.com',
  databaseURL: 'https://ciceroic.firebaseio.com',
  projectId: 'ciceroic',
  storageBucket: 'ciceroic.appspot.com',
  messagingSenderId: '1008865169490',
  appId: '1:1008865169490:web:26a9c8a8b8fee13f5acf8b',
  measurementId: 'G-WZM2E3ZK0G',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const speechesRef = db.collection('speeches')
