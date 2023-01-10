import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const requestValues = [
    requests.theSeventhSeal,
    requests.lastYearAtMarienbad,
    requests.auHasardBalthazar,
  ];

  useEffect(() => {
    axios
      .get(requestValues[Math.floor(Math.random() * requestValues.length)])
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[550px]">
      <img
        className="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/original/${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt={movie?.title || movie?.name || movie?.original_name}
      />
      <div className="absolute w-full top-[20%] p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl text-white fold-bold">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="my-4 text-white text-m">Released: {movie?.release_date}</p>
        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-white">
          {truncateString(movie?.overview, 150)}
        </p>
      </div>
      <div className="absolute w-full px-4 py-24">
        <div className="max-w-[450px] h-[600px] mx-auto bg-gray-800 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Login</h1>
            {error ? <p className="p-3 text-red-500 my-2">{error}</p> : null}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-gray-300 rounded "
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-gray-300 rounded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button className="bg-gray-900 py-3 my-6 rounded font-bold">
                Login
              </button>
              <div className="flex justify-between items-center text-sm text-gray-300">
                <p>
                  <input className="mr-2" type="checkbox" />
                  Remember Me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8 items-center">
                <span className="text-gray-300 mr-2">New to Thoughtflix?</span>
                <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
