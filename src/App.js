import React, { useState, Component } from "react";
import Login from "./components/Login";
import TweetLayout from "./containers/TweetLayout";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "./config/firebase";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={TweetLayout} />
      </Router>
    );
  }
}

export default App;
