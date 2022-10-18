import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwwKQGqLUprIf5MwrBcWthqqdoF1So8Pw",
  authDomain: "crwn-clothing-9e0ac.firebaseapp.com",
  projectId: "crwn-clothing-9e0ac",
  storageBucket: "crwn-clothing-9e0ac.appspot.com",
  messagingSenderId: "736466959832",
  appId: "1:736466959832:web:5ecf921118e792375906ad",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//for google only. It's a class. You can have multiple different providers: popup,...; Other providers such as Facebook are also available
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

//authentication is a singleton
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//Instantiate Firestore instance
//instantiate the doc for getting and setting the information stored in the db
export const db = getFirestore();

//Storing what we get from the google auth service in the firestore db
//On sign up we pass only email and password and should add name as additional ifo
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    return;
  }
  //see if there is an existing doc reference
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  //does it exist in our db?
  console.log(userSnapshot.exists());

  //check if user data exists
  // if user data doesn't exist: create/set the document with tha data from the userAuth in my collection
  //and set it using userSnapshot because it's pointing to a specific place in the collection with specific id, for the wanted data
  // if user data exists: just return the userDocRef
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    //signing in time
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if user data exists: just return the userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};
