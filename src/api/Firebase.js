import conf from '../config'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
var config = conf.firebase;
firebase.initializeApp(config);
export default firebase