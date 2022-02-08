import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyAHB2x6JFPzLDfAaUuVyHRbUCWjK70q0cE",
          authDomain: "nuxt-todo-saigo.firebaseapp.com",
          storageBucket: "nuxt-todo-saigo.appspot.com",
          messagingSenderId: "346599048088",
          appId: "1:346599048088:web:2cc7821adb35ba0a0321ed",
          measurementId: "G-PGZQRS06GF",
          projectId: "nuxt-todo-saigo",
    }
  )
}
//.envファイル
export default firebase