import React from "react";
import { Comment, Tooltip, List } from "antd";
import moment from "moment";
import firebase from "../config/firebase";

const db = firebase.firestore();

const data = [
  {
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>
          {moment()
            .subtract(1, "days")
            .fromNow()}
        </span>
      </Tooltip>
    )
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(2, "days")
          .format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>
          {moment()
            .subtract(2, "days")
            .fromNow()}
        </span>
      </Tooltip>
    )
  }
];

class Feed extends React.Component {
  state = {
    items: [],
    loading: true
  };
  componentDidMount() {
    this.fetchFeed();
  }
  fetchFeed = () => {
    db.collection("tweets")
      .orderBy("created", "asc")
      .onSnapshot(snapshot => {
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
      });
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
