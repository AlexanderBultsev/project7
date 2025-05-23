import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import PostDataService from "../services/post.service";
import { AuthContext } from "../AuthContext";

const PostDetail = () => {
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
    }  finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container w-50 d-flex flex-column align-items-center gap-3">
      {isLoading ? (
        <div className="text-center">Загрузка...</div>
      ) : (
        <article className="card">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{post.title}</h5>
            <Link className="card-text link-secondary" to={`/users/${author.id}`}>
              @{author.username}
            </Link>
            <p className="card-text">{post.text}</p>
            {user && (user.staff || user.id === author.id) ? (
              <Link className="btn btn-outline-success" to={`/posts/${post.id}/edit`}>
                Редактировать
              </Link>
            ) : null}
          </div>
        </article>
      )}
    </div>
  );
};

export default PostDetail;
