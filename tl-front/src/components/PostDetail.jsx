import React, { Component } from "react";
import PostDataService from "../services/post.service"
import { withRouter } from "../wrappers/withRouter";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);

    this.state = {
      currentPost: {
        id: null,
        title: "",
        text: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPost(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          title: title
        }
      };
    });
  }

  onChangeText(e) {
    const text = e.target.value;
    
    this.setState(prevState => ({
      currentPost: {
        ...prevState.currentPost,
        text: text
      }
    }));
  }

  getPost(id) {
    PostDataService.get(id)
      .then(response => {
        this.setState({
          currentPost: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.props.router.navigate("/posts", { replace: true });
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentPost.id,
      title: this.state.currentPost.title,
      text: this.state.currentPost.text,
      published: status
    };

    PostDataService.update(
      this.state.currentPost.id,
      data
    )
      .then(response => {
        this.setState(prevState => ({
          currentPost: {
            ...prevState.currentPost,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePost() {
    PostDataService.update(
      this.state.currentPost.id,
      this.state.currentPost
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Статья успешно обновлена!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePost() {
    PostDataService.delete(this.state.currentPost.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate("/posts", { replace: true });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPost } = this.state;

    return (
      <div className="container w-50 d-flex flex-column align-items-center gap-3">
        <form className="card" onSubmit={(e) => {e.preventDefault()}}>
          <div className="card-body d-flex flex-column gap-2">
            <h5 className="card-title">Изменить статью</h5>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Заголовок</label>
              <input type="text" className="form-control" id="title" name="title" required value={currentPost.title} onChange={this.onChangeTitle} />
            </div>
            <div className="form-group">
              <label htmlFor="text" className="form-label">Описание</label>
              <input type="text" className="form-control" id="text" name="text" required value={currentPost.text} onChange={this.onChangeText} />
            </div>
            <div className="form-group">
              <label> Статус: {currentPost.published ? "Опубликовано" : "Отложено"} </label>
            </div>
            {currentPost.published ? (
              <button className="btn btn-primary" onClick={() => this.updatePublished(false)}>Отложить</button>
            ) : (
              <button className="btn btn-primary" onClick={() => this.updatePublished(true)}>Опубликовать</button>
            )}
            <button className="btn btn-danger" onClick={this.deletePost}>Удалить</button>
            <button className="btn btn-success" onClick={this.updatePost}>Обновить</button>
            <p className="card-text">{this.state.message}</p>
          </div>
        </form>
      </div>
    );
  }
};

export default withRouter(PostDetail);