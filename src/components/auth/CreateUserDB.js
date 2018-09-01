import { Firebase as firebase } from '../../api'
const db = firebase.firestore();

export default function CreateUserDB (user) {
    console.log(user);
    const userRef = db.collection("users").doc(user["uid"]);
    userRef.get().then((documentSnapshot) => {
        var updateData = {
            lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
        }
        if (!documentSnapshot.exists) {
            updateData.displayName = user["displayName"] || user["email"];
            userRef.set(updateData);
        } else {
            userRef.update(updateData);
        }
    });
}