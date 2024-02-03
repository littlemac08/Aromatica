import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD3WZZRWz5wmr8xTwnmNooYfboPvQ15pfc",
    authDomain: "aromatica-7f432.firebaseapp.com",
    databaseURL: "https://aromatica-7f432-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aromatica-7f432",
    storageBucket: "gs://aromatica-7f432.appspot.com",
    messagingSenderId: "2485762977",
    appId: "1:2485762977:web:9e55b199a903cc684c29e0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firebaseStorage = getStorage(app);
export { app, database, firebaseStorage };  // Export both the app and the database
