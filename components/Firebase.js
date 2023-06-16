import { FIREBASE_API_KEY } from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "react-native-for-designers.firebaseapp.com",
  databaseURL: "https://react-native-for-designers.firebaseio.com",
  storageBucket: "react-native-for-designers.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default { auth };
