import React, { Component } from "react";
import PostDataService from "../services/post.service"
import { withWrapper } from "../wrappers/withWrapper";


class PostAdd extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.savePost = this.savePost.bind(this);

    this.state = {
      id: null,
      title: "",
      text: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  savePost() {
    var data = {
      title: this.state.title,
      text: this.state.text
    };

    PostDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          text: response.data.text,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
        this.props.navigate("/posts", { replace: true });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="container w-50 d-flex flex-column align-items-center gap-3">
        <form className="card" onSubmit={(e) => {e.preventDefault()}}>
          <div className="card-body d-flex flex-column gap-2">
            <h5 className="card-title">Опубликовать статью</h5>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Заголовок</label>
              <input type="text" className="form-control" id="title" name="title" required value={this.state.title} onChange={this.onChangeTitle} />
            </div>
            <div className="form-group">
              <label htmlFor="text" className="form-label">Описание</label>
              <input type="text" className="form-control" id="text" name="text" required value={this.state.text} onChange={this.onChangeText} />
            </div>
            <button onClick={this.savePost} className="btn btn-success">Опубликовать</button>
          </div>
        </form>
      </div>
    );
  }
}


export default withWrapper(PostAdd);