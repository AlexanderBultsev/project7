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
import PostEdit from "./components/PostEdit";
import PostDelete from "./components/PostDelete";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  return (
    <main className="d-flex flex-column gap-3 min-vh-100">
      <Header />
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/posts" element={<PostList/>} />
        <Route path="/posts/:id" element={<PostDetail/>} />
        <Route path="/users/authorize" element={<Login/>} />
        <Route path="/users/register" element={<Register/>} />

        <Route path="/add" element={<ProtectedRoute><PostAdd/></ProtectedRoute>} />
        <Route path="/users/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/posts/:id/edit" element={<ProtectedRoute><PostEdit/></ProtectedRoute>} />
        <Route path="/posts/:id/delete" element={<ProtectedRoute><PostDelete/></ProtectedRoute>}/>
        
        <Route path="/*" element={<Navigate to="/" replace/>} />
      </Routes>
    </main>
  );
}

export default App;