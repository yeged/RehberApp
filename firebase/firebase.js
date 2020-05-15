import * as firebase from "firebase"
import "firebase/storage"

const config = {
    apiKey: "AIzaSyD8eaD13vTuodubThb03tHwK3eTFHJ83IY",
    authDomain: "rehber-2e983.firebaseapp.com",
    databaseURL: "https://rehber-2e983.firebaseio.com",
    projectId: "rehber-2e983",
    storageBucket: "rehber-2e983.appspot.com",
    messagingSenderId: "56813367686",
    appId: "1:56813367686:web:c69c5e576e0ce7914bfc07",
    measurementId: "G-FB18SME1XK"
}

firebase.initializeApp(config)


export default firebase