import * as _firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjbGsGZHx3JxsLpEXINfYiisThbjy2rLA",
  authDomain: "lyric-keeper.firebaseapp.com",
  databaseURL: "https://lyric-keeper.firebaseio.com",
  projectId: "lyric-keeper",
  storageBucket: "lyric-keeper.appspot.com",
  messagingSenderId: "208904194976",
  appId: "1:208904194976:web:d6cb4038664e97d00cf2c5",
};

// Initialize Firebase
export const firebase = _firebase.initializeApp(firebaseConfig);
