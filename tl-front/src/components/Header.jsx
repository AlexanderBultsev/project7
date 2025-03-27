import React from "react";
import { Link } from 'react-router-dom'

const Header = () => {
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
        </div>
      </nav>
    </header>
  )
}


export default Header
