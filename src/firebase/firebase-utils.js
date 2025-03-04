import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyDbBBNDMZLpni91GgD-00P_gBJmyjjeuZg",
    authDomain: "crwn-db-8504f.firebaseapp.com",
    projectId: "crwn-db-8504f",
    storageBucket: "crwn-db-8504f.firebasestorage.app",
    messagingSenderId: "77687499099",
    appId: "1:77687499099:web:1acee26ab79f659749127e",
    measurementId: "G-QMPW561JEW"
};

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdDate = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdDate,
                ...additionalData
            })
        } catch (error) {
            console.error('error while creating a user : ', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;