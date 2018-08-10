var firebase = require('firebase')
var config = {
    apiKey: "AIzaSyBIJ2rA8DJvnpYntMw1jJ18RfbjoXidUoI",
    authDomain: "claytondoesthingsxyz.firebaseapp.com",
    databaseURL: "https://claytondoesthingsxyz.firebaseio.com",
    projectId: "claytondoesthingsxyz",
    storageBucket: "claytondoesthingsxyz.appspot.com",
    messagingSenderId: "437160140079"
};
firebase.initializeApp(config);
export default firebase