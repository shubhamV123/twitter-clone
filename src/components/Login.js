import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../config/firebase";
const db = firebase.firestore();

class Login extends Component {
  state = { redirectToReferrer: false };

  login = () => {
    let that = this;
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(function(result) {
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
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            that.props.history.push("/protected");
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });

        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  render() {
    let { redirectToReferrer } = this.state;
    return (
      <div>
        <p>You must log in to view this page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default Login;
