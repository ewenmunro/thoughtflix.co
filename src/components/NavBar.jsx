import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-8 z[100] w-full absolute">
      <Link to="/">
        <h1 className="text-white text-3xl font-bold cursor-pointer">
          THOUGHTFLIX
        </h1>
        <p className="text-white text-1xl font-bold cursor-pointer">
          Promoting thought-provoking filmmakers
        </p>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-6 cursor-pointer">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-6 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-6 cursor-pointer">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-gray-800 text-white px-6 py-2 rounded cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
