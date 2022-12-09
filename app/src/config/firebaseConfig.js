import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBg23_djnO11_-EwQGZuJQ0B56eDY_wOyg",
    authDomain: "yiftach-7f985.firebaseapp.com",
    projectId: "yiftach-7f985",
    storageBucket: "yiftach-7f985.appspot.com",
    messagingSenderId: "25440899599",
    appId: "1:25440899599:web:e9edc23bc321a4f03ec97a",
    databaseURL: "https://yiftach-7f985-default-rtdb.europe-west1.firebasedatabase.app/",
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);