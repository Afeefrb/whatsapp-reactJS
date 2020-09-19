// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCcLQ-Dnm7lMct0SeJrpyxuTsg1UVl3fF8",
    authDomain: "whatsapp-reactjs.firebaseapp.com",
    databaseURL: "https://whatsapp-reactjs.firebaseio.com",
    projectId: "whatsapp-reactjs",
    storageBucket: "whatsapp-reactjs.appspot.com",
    messagingSenderId: "332831866993",
    appId: "1:332831866993:web:ddeb4bb06ca8f54210dbd0",
    measurementId: "G-75MQP23HRM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;