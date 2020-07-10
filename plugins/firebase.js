// ~/plugins/firebase.js

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCatTrJmxCm_3okrPxkvs08MDHY0Q9OEe0",
  authDomain: "datefilipina.firebaseapp.com",
  databaseURL: "https://datefilipina.firebaseio.com",
  projectId: "datefilipina",
  storageBucket: "datefilipina.appspot.com",
  messagingSenderId: "962248553463",
  appId: "1:962248553463:web:88a8d8113cea57e5d974f2",
  measurementId: "G-2K0Y2NRJ81"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

export const auth = firebase.auth()
export const db = firebase.firestore()
export default firebase