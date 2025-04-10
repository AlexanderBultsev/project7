import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import UserDataService from "../services/user.service"


const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: null,
    username: null,
    staff: false
  });
  const [posts, setPosts] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(params.id);
  }, [params.id]);

  const getUser = async (id) => {
    try {
      setIsLoading(true);
      const response = await UserDataService.get(id);
      console.log(response.data)
      setUser({
        id: response.data.user.id,
        username: response.data.user.username,
        staff: response.data.user.staff
      });
      
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
      navigate("/posts", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container w-50 d-flex flex-column align-items-center gap-3">
      {isLoading ? (
        <div className="text-center">Загрузка...</div>
      ) : (
        <>
          <article className="card">
            <h5 className="card-header">Профиль {user.username}</h5>
            <div className="card-body d-flex flex-column">
              {user.staff ? (
                <p className="card-text">Администратор</p>
              ) : (
                <p className="card-text">Пользователь</p>
              )}
            </div>
          </article>
          {posts.map(post => (
            <article key={post.id} className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.text}</p>
                <Link className="btn btn-outline-dark" to={"/posts/" + post.id}>Читать</Link>
              </div>
            </article>
          ))}
        </>
      )}
    </div>
  );
};


export default Profile;
