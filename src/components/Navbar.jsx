import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../redux/auth/auth.slice";

const Navbar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const { myProfile, selectedProfile } = useSelector((state) => state.auth); // Access user from Redux store
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch(); // For dispatching actions
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/dashboard")
  };

  return (
    <>
      <div className="fixed bg-white z-[9999999] w-screen">
        <nav className="w-full flex gap-3 px-5 py-3 items-center">
          <img src="/pinterest-logo.svg" className="h-8" alt="Logo" />
          <Link
            className={`hover:bg-zinc-200 font-semibold px-3 py-2 rounded-full ${
              currentRoute === "/home"
                ? "bg-zinc-800 text-white hover:bg-zinc-800"
                : "hover:bg-zinc-200"
            }`}
            to="/home"
          >
            Home
          </Link>
          <Link
            className={`font-semibold px-3 py-2 rounded-full ${
              currentRoute === "/explore"
                ? "bg-zinc-800 text-white hover:bg-zinc-800"
                : "hover:bg-zinc-200"
            }`}
            to="/explore"
          >
            Explore
          </Link>
          <Link
            className={`font-semibold px-3 py-2 rounded-full ${
              currentRoute === "/create/pin" || currentRoute === "/create/board"
                ? "bg-zinc-800 text-white hover:bg-zinc-800"
                : "hover:bg-zinc-200"
            }`}
            to="/create/pin"
          >
            Create
          </Link>
          <div className="search w-[70vw] flex items-center">
            <img
              src="/Magnifying-Glass--Streamline-Core.svg"
              className="h-5 absolute ml-3"
              alt="Search Icon"
            />
            <input
              type="search"
              className="bg-zinc-200 w-full px-3 py-2 rounded-full pl-10 placeholder:text-zinc-500"
              placeholder="Search Here..."
            />
          </div>
          <Link to="/chats" className="mx-1">
            {currentRoute === "/chats" ? (
              <img
                src="/Chat-Bubble-Typing-Oval--Streamline-Core copy.svg"
                className="p-0.5 h-8 w-8"
                alt="Chat Icon"
              />
            ) : (
              <img
                src="/Chat-Bubble-Typing-Oval--Streamline-Core.svg"
                className="p-0.5 h-8 w-8"
                alt="Chat Icon"
              />
            )}
          </Link>
          <Link
            className={`h-8 w-8 ${
              currentRoute === "/dashboard" || currentRoute === `/profile/${myProfile?.username || selectedProfile?.username}` ? "border-zinc-800 border-2" : ""
            } rounded-full`}
            to="/dashboard"
          >
            <img
              src={`/uploads/${myProfile?.profileImage || selectedProfile?.profileImage}`}
              className="p-0.5 h-full w-full object-cover rounded-full bg-zinc-200"
              alt="User Profile"
            />
          </Link>
          <img
            src="/arrow-down-s-line.svg"
            className={`icon h-6 -ml-2 transition-transform ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            alt="Menu Toggle"
            onClick={toggleMenu}
          />
          <div
            className={`menu absolute bg-zinc-200 px-3 py-1.5 rounded-md right-0 mr-6 mt-20 transition-all ${
              isMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <Link
              to="/users/logout"
              className="text-red-500"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </nav>
        <hr color="#e4e4e7" className="h-0.5" />
      </div>
      <hr color="#e4e4e7" className="h-0.5 mb-16" />
    </>
  );
};

export default Navbar;
