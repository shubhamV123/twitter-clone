import React from "react";
import InputTextArea from "../components/InputTextArea";
import Feed from "../components/Feed";
import firebase from "../config/firebase";
import { Button } from "antd";
const db = firebase.firestore();

class TweetLayout extends React.Component {
  handleSubmit = val => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        db.collection("tweets")
          .add({
            name: user.displayName,
            img: user.photoURL,
            created: new Date(),
            text: val,
            email: user.email
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        // User is signed in.
      } else {
        console.log("Hello123123");
        // No user is signed in.
      }
    });
  };

  render() {
    return (
      <div className="tweet-layout">
        <h1 className="text-center">Post your next tweet</h1>
        <InputTextArea handleSubmit={this.handleSubmit} />
        <Feed />
      </div>
    );
  }
}

export default TweetLayout;
