import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6ZBu5vzh_A9nazypp9WrgmRDExtZOu74",
  authDomain: "fbla-finance-app.firebaseapp.com",
  projectId: "fbla-finance-app",
  storageBucket: "fbla-finance-app.firebasestorage.app",
  messagingSenderId: "858584590485",
  appId: "1:858584590485:web:a5148dfd922efe8427d39c"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8458);
const auth = getAuth(app)

export { app, db, auth };
