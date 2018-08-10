import Firebase from './Firebase'

const FStorage = Firebase.storage();
const Database = Firebase.database();
const Firestore = Firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
Firestore.settings(settings);
const Messaging = Firebase.messaging();
const Functions = Firebase.functions();

export {
    Firebase,
    FStorage,
    Database,
    Firestore,
    Messaging,
    Functions
}

