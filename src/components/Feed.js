import React from "react";
import { Comment, Tooltip, List } from "antd";
import moment from "moment";
import firebase from "../config/firebase";

const db = firebase.firestore();

class Feed extends React.Component {
  state = {
    items: [],
    loading: true,
    user: {}
  };
  componentDidMount() {
    this.manageUser();
  }

  manageUser = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // let userIs = db.collection('users')
        // let activeRef = await userIs.where('email', '==', user.email).get();
        // let followers = [];
        // console.log(activeRef.docs.length)
        // activeRef.docs.forEach(doc => console.log(doc.data())));
        // User is signed in.
        this.setState(
          {
            user: {
              email: user.email
              // follower: followers
            }
          },
          () => {
            this.fetchFeed();
          }
        );
      }
    });
  };
  fetchFeed = () => {
    console.log(this.state);
    let query = db.collection("tweets");
    // query = query.where("email", "==", this.state.user.email)
    // db.collection("tweets")
    //     .where("email", "==", this.state.user.email)
    // this.state.user.follower.forEach(data => {
    //     console.log("Data", data);
    //     return query.where(`email.${data}`, "==", true);
    // })
    query.orderBy("created", "asc").onSnapshot(
      snapshot => {
        let oldArr = [];
        snapshot.docs.forEach(doc => {
          let items = doc.data();
          let data = {
            author: items.name,
            avatar: items.img,
            content: <p>{items.text}</p>,
            datetime: (
              <Tooltip
                title={moment(items.created.seconds * 1000).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              >
                <span>{moment(items.created.seconds * 1000).fromNow()}</span>
              </Tooltip>
            )
          };
          oldArr = [data, ...oldArr];
        });

        this.setState({ items: oldArr, loading: false });
      },
      function(error) {
        //...
        console.log("Erro", error);
      }
    );
  };
  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <List
        className="comment-list mt-1"
        header={`${this.state.items.length} replies`}
        itemLayout="horizontal"
        dataSource={this.state.items}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    );
  }
}

export default Feed;
