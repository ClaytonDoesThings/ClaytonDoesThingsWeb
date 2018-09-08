import { Firebase as firebase } from '../../api'
const db = firebase.firestore();

export default function CreateUserDB (user) {
    const userRef = db.collection("users").doc(user["uid"]);
    userRef.get().then((documentSnapshot) => {
        var updateData = {
            lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
        }
        if (documentSnapshot.data().displayName === undefined) {
            updateData.displayName = user["displayName"] || user["email"];
        }
        if (documentSnapshot.data().email === undefined) {
            updateData.email = user["email"];
        }
        userRef.update(updateData);
    });
}