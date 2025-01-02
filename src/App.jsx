import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Start from "./pages/Start";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Pin from "./pages/Pin";
import Profile from "./pages/Profile";
import Board from "./pages/Board";
import CreatePin from "./pages/CreatePin"
import CreateBoard from "./pages/CreateBoard"
import SavedPins from "./pages/SavedPins"

const App = () => {
  const { user } = useSelector((state) => state.auth); // Access user from Redux store

  return (
    <>
      <div className="container">
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pin/:pinId" element={<Pin />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/board/:boardId" element={<Board />} />
          <Route path="/create/pin" element={<CreatePin />} />
          <Route path="/create/board" element={<CreateBoard />} />
          <Route path="/pins/saved" element={<SavedPins />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
