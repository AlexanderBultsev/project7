import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import PostDataService from "../services/post.service";
import { AuthContext } from "../AuthContext";

const PostDelete = () => {
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

  const deletePost = async () => {
    try {
      const response = await PostDataService.delete(post.id);
      console.log(response.data)
      navigate("/posts", { replace: true });
    } catch (error) {
      console.error(error);
      navigate("/posts", { replace: true });
    }
  }

  return (
    <div className="container w-50 d-flex flex-column align-items-center gap-3">
      {isLoading ? (
        <div className="text-center">Загрузка...</div>
      ) : (
        <form className="card" onSubmit={(e) => e.preventDefault()}>
        <h5 className="card-header">Удалить статью</h5>
          <div className="card-body d-flex flex-column gap-2">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.text}</p>
            <Link className="btn btn-outline-success" to={`/posts/${post.id}/edit`}>Отменить</Link>
            <button className="btn btn-outline-danger" onClick={deletePost}>Удалить статью</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PostDelete;