import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyA5J4UV3QpYRw-aTZ2EEuUQEnBYpdXCFvQ",
  authDomain: "item-state-tracker.firebaseapp.com",
  databaseURL: "https://item-state-tracker.firebaseio.com",
  projectId: "item-state-tracker",
  storageBucket: "item-state-tracker.appspot.com",
  messagingSenderId: "918407273334"
}

const fire = firebase.initializeApp(config)
export default fire
