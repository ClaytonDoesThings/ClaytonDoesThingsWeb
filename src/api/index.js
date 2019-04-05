import Firebase from './Firebase'

const FStorage = Firebase.storage();
const Database = Firebase.database();
const Firestore = Firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
Firestore.settings(settings);

export {
    Firebase,
    FStorage,
    Database,
    Firestore
}

