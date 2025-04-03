import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import PostDetail from "./components/PostDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
  return (
    <main className="d-flex flex-column gap-3 min-vh-100">
      <Header />
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/posts" element={<PostList/>} />
        <Route path="/add" element={<PostAdd/>} />
        <Route path="/posts/:id" element={<PostDetail/>} />
        <Route path="/users/profile" element={<Profile/>} />
        <Route path="/users/authorize" element={<Login/>} />
        <Route path="/users/register" element={<Register/>} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;