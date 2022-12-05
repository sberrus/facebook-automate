// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCyEsTxDoreC0fwU4Ti_BeqgWIO3cawL2k",
	authDomain: "facebook-automate-1526f.firebaseapp.com",
	projectId: "facebook-automate-1526f",
	storageBucket: "facebook-automate-1526f.appspot.com",
	messagingSenderId: "287632467418",
	appId: "1:287632467418:web:6e3d9fe39b56645de98ce3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth();
const db = getFirestore();

export { auth, db };
