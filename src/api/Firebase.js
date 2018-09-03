import conf from '../config'
var firebase = require('firebase')
var config = conf.firebase;
firebase.initializeApp(config);
export default firebase