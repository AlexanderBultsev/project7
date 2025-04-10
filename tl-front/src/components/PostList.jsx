import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import PostDataService from "../services/post.service";


const PostList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = async () => {
    try {
      setIsLoading(true);
      const response = await PostDataService.getAll();
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      navigate("/", { replace: true });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container w-50 d-flex flex-column align-items-center gap-3">
      {isLoading ? (
        <div className="text-center">Загрузка...</div>
      ) : (
        posts.map(post => (
          <article key={post.id} className="card">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.text}</p>
              <Link className="btn btn-outline-dark" to={"/posts/" + post.id}>Читать</Link>
            </div>
          </article>
        ))
      )}
    </div>
  )
};


export default PostList;