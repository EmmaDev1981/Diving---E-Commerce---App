import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    
        apiKey: "AIzaSyDe1GrG3K82HTpx2zWdE7QbSxiA0yTHWR4",
        authDomain: "crown-db-950de.firebaseapp.com",
        projectId: "crown-db-950de",
        storageBucket: "crown-db-950de.appspot.com",
        messagingSenderId: "650921850920",
        appId: "1:650921850920:web:0e0d7c20dc5f4dc3385d1d",
        measurementId: "G-HJZX12SBE1"
      
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
      
        const userRef = firestore.doc(`users/${userAuth.uid}`);
      
        const snapShot = await userRef.get();
      
        if (!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            });
          } catch (error) {
            console.log('error creating user', error.message);
          }
        }
      
        return userRef;
      };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export async function signInWithGoogle () {
 const result = await auth.signInWithPopup(provider)
 return result
}

export default firebase;