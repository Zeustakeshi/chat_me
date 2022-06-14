import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    connectAuthEmulator,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBfExG2XPCMnEnfVFeQPFHVv9MOJzj8Apw",
    authDomain: "chat-me-shark.firebaseapp.com",
    projectId: "chat-me-shark",
    storageBucket: "chat-me-shark.appspot.com",
    messagingSenderId: "548736585920",
    appId: "1:548736585920:web:f1a568dd2a209f138b9d25",
    measurementId: "G-BL7466T61K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const ggProvider = new GoogleAuthProvider();
const db = getFirestore();

if (window.location.hostname === "localhost") {
    connectFirestoreEmulator(db, "localhost", 8080);
}
connectAuthEmulator(auth, "http://localhost:9099");

export {
    analytics,
    auth,
    ggProvider,
    signInWithPopup,
    doc,
    setDoc,
    db,
    updateDoc,
};
