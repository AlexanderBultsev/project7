import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"

import UserDataService from "../services/user.service";
import { AuthContext } from "../AuthContext";


const Login = () => {
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUser(prevState => ({
      ...prevState,
      username: e.target.value
    }))
  }

  const onChangePassword = (e) => {
    setUser(prevState => ({
      ...prevState,
      password: e.target.value
    }))
  }

  const authorize = async () => {
    try {
      const response = await UserDataService.authorize(user);
      console.log(response.data);
      login(response.data.user);
      navigate(`/users/${response.data.user.id}`, { replace: true });
    } catch (error) {
      console.error(error);
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="container w-50 d-flex flex-column align-items-center gap-3">
      <form className="card" onSubmit={(e) => {e.preventDefault()}}>
        <div className="card-body d-flex flex-column gap-2">
          <h5 className="card-title">Вход</h5>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Имя пользователя</label>
            <input type="text" className="form-control" id="username" name="username" required value={user.username} onChange={onChangeUsername} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input type="password" className="form-control user-select-none" id="password" name="password" required value={user.password} onChange={onChangePassword} />
          </div>
          <button onClick={authorize} className="btn btn-success">Войти</button>
        </div>
      </form>
      <Link className="text-dark user-select-none" to="/users/register">Зарегистрироваться</Link>
    </div>
  )
}


export default Login
