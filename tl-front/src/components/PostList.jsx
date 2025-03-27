import React, { Component } from "react";
import PostDataService from "../services/post.service"
import { Link } from "react-router-dom";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.retrievePosts = this.retrievePosts.bind(this);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    PostDataService.getAll()
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="container w-50 d-flex flex-column align-items-center gap-3">
        {this.state.posts.map(post => (
          <article key={post.id} className="card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.text}</p>
              <Link className="btn btn-outline-dark" to={"/posts/" + post.id}>Читать</Link>
            </div>
          </article>
        ))}
      </div>
    )
  }
};


export default PostList;