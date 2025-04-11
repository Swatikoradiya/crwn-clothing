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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    console.log(objectsToAdd);
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'})

export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;