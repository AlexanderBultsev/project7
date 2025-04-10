import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PostDataService from "../services/post.service"
import { AuthContext } from "../AuthContext";


const PostAdd = () => {
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState({
    title: "",
    text: "",
    userId: user ? user.id : null
  });

  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setPost(prevState => ({
      ...prevState,
      title: e.target.value
    }));
  };

  const onChangeText = (e) => {
    setPost(prevState => ({
      ...prevState,
      text: e.target.value
    }))
  }

  const savePost = async () => {
    try {
      const response = await PostDataService.create(post);
      console.log(response.data);
      navigate(`/posts/${response.data.id}`, { replace: true });
    } catch (error) {
      console.error(error);
      navigate("/posts", { replace: true });
    }
  }

  return (
    <div className="container w-50 d-flex flex-column align-items-center gap-3">
      <form className="card" onSubmit={(e) => {e.preventDefault()}}>
        <div className="card-body d-flex flex-column gap-2">
          <h5 className="card-title">Опубликовать статью</h5>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Заголовок</label>
            <input type="text" className="form-control" id="title" name="title" required value={post.title} onChange={onChangeTitle} />
          </div>
          <div className="form-group">
            <label htmlFor="text" className="form-label">Описание</label>
            <input type="text" className="form-control" id="text" name="text" required value={post.text} onChange={onChangeText} />
          </div>
          <button onClick={savePost} className="btn btn-success">Опубликовать</button>
        </div>
      </form>
    </div>
  );
}


export default PostAdd;