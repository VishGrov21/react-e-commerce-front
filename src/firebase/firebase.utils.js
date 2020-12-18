// The firebase has stored all of its utilities in the app
import firebase from 'firebase/app';
// First import the firebase only after that auth, storage and other utilities can be imported
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDLS4oF2ZTXivN8w26NKA7na2ZUY7wfUjE',
  authDomain: 'crown-clothing-vishal.firebaseapp.com',
  databaseURL: 'https://crown-clothing-vishal.firebaseio.com',
  projectId: 'crown-clothing-vishal',
  storageBucket: 'crown-clothing-vishal.appspot.com',
  messagingSenderId: '425816403542',
  appId: '1:425816403542:web:29b09b3f33218ca9edd5f7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Code for handling sign-in with google
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
// exporting sign-in with google method
export const signInWIthGoogle = () => auth.signInWithPopup(googleProvider);

export const setCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged method is an open subscription between our app and firebase
    // Whenever any changes occur on firebase or our app from any source related to this app
    // Firebase sends a msg that auth state has changed
    // Whether they signed-in through some service like Google Sign In
    // Or using email and password
    // This connection is always open as long as this component is mounted on the dom.
    const unSubscribe = auth.onAuthStateChanged((userAuth) => {
      unSubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const createUser = async (user, additonalData) => {
  if (user) {
    // firestore.doc would always provide a document reference back irrespective of data exist or no in firestore
    // Using this reference obj we can tell firebase whether to save the data or to get the data
    // This doesn't has the actual data instead has properties that tells details about it
    const userRef = firestore.doc(`users/${user.uid}`);
    // we get the snapshot object from the reference object using the .get() method
    // documentRef returns a document snapshot obj
    // collectionRef returns a querysnapshot obj
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      const { displayName, email } = user;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additonalData,
        });
      } catch (error) {
        console.log("User couldn't be created");
      }
    }
    return userRef;
  }
};

export const addCollectionAndDocuments = async (collectionName, documentsToAdd) => {
  const collectionRef = firestore.collection(collectionName);

  const batch = firestore.batch();
  documentsToAdd.forEach((document) => {
    const newRefDoc = collectionRef.doc();
    batch.set(newRefDoc, document);
  });

  return await batch.commit();
};

export const addPropertiesToProductsCollection = (productCollectionsRef) => {
  // Products collection Ref object will have docs which is then applied map to get array
  // This array will contain objects of individual categories & their data in object format
  const transformedProductObj = productCollectionsRef.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
    };
  });
  // console.log(transformedProductObj);
  return transformedProductObj.reduce((accumulatorObj, product) => {
    accumulatorObj[product.title.toLowerCase()] = product;
    return accumulatorObj;
  }, {});
};

export default firebase;
