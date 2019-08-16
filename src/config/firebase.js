import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBZ_h09GHfoAJXGgw0VJnGmRRCP4Dtdg2A",
  authDomain: "twitter-auth-75c6b.firebaseapp.com",
  databaseURL: "https://twitter-auth-75c6b.firebaseio.com",
  projectId: "twitter-auth-75c6b",
  storageBucket: "",
  messagingSenderId: "960541556019",
  appId: "1:960541556019:web:d45aba655352e6df"
};
firebase.initializeApp(config);
// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export default firebase;
