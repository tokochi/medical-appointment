
"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB28oe35vHTZddpDNLnRx6RCfIOiaV0PY4",
    authDomain: "medical-app-397822.firebaseapp.com",
    projectId: "medical-app-397822",
    storageBucket: "medical-app-397822.appspot.com",
    messagingSenderId: "392842787381",
    appId: "1:392842787381:web:8028f042456095de890f7c",
    measurementId: "G-SV1XE62F91"
};

// Initialize Firebase
let analytics;
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}
export const storage = getStorage(app)