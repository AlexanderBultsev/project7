import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import PostDataService from "../services/post.service";
import { AuthContext } from "../AuthContext";

const PostEdit = () => {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({
    id: null,
    title: "",
    text: ""
  });
  const [author, setAuthor] = useState({
    id: null,
    username: ""
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(params.id);
  }, [params.id]);

  useEffect(() => {
    if (!isLoading && author.id !== null && user) {
      if (!(user && (user.staff || user.id === author.id))) {
        navigate("/posts", { replace: true });
      }
    }
  }, [author, user, isLoading]);

  const getPost = async (id) => {
    try {
      setIsLoading(true);
      const response = await PostDataService.get(id);
      console.log(response.data)
      setPost({
        id: response.data.post.id,
        title: response.data.post.title,
        text: response.data.post.text
      });

      setAuthor({
        id: response.data.user.id,
        username: response.data.user.username
      });
    } catch (error) {
      console.error(error);
      navigate("/posts", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

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

  const updatePost = async () => {
    try {
      const response = await PostDataService.update(post.id, post);
      console.log(response.data)
      navigate(`/posts/${post.id}`, { replace: true });
    } catch (error) {
      console.error(error);
      navigate("/posts", { replace: true });
    }
  };

  return (
    <div className="container w-50 d-flex flex-column align-items-center gap-3">
      {isLoading ? (
        <div className="text-center">Загрузка...</div>
      ) : (
        <form className="card" onSubmit={(e) => e.preventDefault()}>
          <h5 className="card-header">Изменить статью</h5>
          <div className="card-body d-flex flex-column gap-2">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Заголовок</label>
              <input 
                type="text" 
                className="form-control" 
                id="title" 
                name="title" 
                required 
                value={post.title} 
                onChange={onChangeTitle} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="text" className="form-label">Описание</label>
              <input 
                type="text" 
                className="form-control" 
                id="text" 
                name="text" 
                required 
                value={post.text} 
                onChange={onChangeText} 
              />
            </div>
            <button className="btn btn-outline-success" onClick={updatePost}>Соxранить статью</button>
            <Link className="btn btn-outline-danger" to={`/posts/${post.id}/delete`}>Удалить статью</Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default PostEdit;