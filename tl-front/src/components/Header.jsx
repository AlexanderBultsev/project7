import React from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext"
import { Link } from "react-router-dom"


const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return(
    <header className="border-bottom">
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">TLog</Link>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link text-dark user-select-none" to="/posts">Статьи</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark user-select-none" to="/add">Опубликовать</Link>
            </li>
          </ul>
          <div className="btn-group">
            {user ? (
              <>
                <Link className="btn btn-outline-dark" to="/users/profile">{user.username}</Link>
                <Link className="btn btn-outline-dark" to="/" onClick={logout}>Выход</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-dark" to="/users/authorize">Вход</Link>
                <Link className="btn btn-outline-dark" to="/users/register">Регистрация</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}


export default Header
