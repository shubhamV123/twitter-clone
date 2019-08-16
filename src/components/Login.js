import React, { Component } from "react";
import firebase from "../config/firebase";
const db = firebase.firestore();

class Login extends Component {
  state = { redirectToReferrer: false };

  login = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        localStorage.setItem("token", token);
        db.collection("users")
          .add({
            name: user.displayName,
            img: user.photoURL,
            email: user.email,
            uid: user.uid
          })
          .then(docRef => {
            this.props.history.push("/protected");
          })
          .catch(function(error) {});

        // ...
      })
      .catch(function(error) {
        // Need to handle error conditions
      });
  };

  render() {
    return (
      <div>
        <p>You must log in to view this page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default Login;
