// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoC60D98TSnNT29NY4tUeVa3Bfloe5E8U",
  authDomain: "blue-teapot-theatre.firebaseapp.com",
  projectId: "blue-teapot-theatre",
  storageBucket: "blue-teapot-theatre.appspot.com",
  messagingSenderId: "980453296138",
  appId: "1:980453296138:web:658a6a130ecb9c1b60b7f3",
  measurementId: "G-8LYVPHVZ64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Authentication

const db = getFirestore(app);

// Export the auth object for use in other parts of your application
export { auth, db };
export default app;
