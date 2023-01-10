import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import SavedMovies from "../components/SavedMovies";

const Account = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <>
      <div className="w-full text-white">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt={movie?.title || movie?.name || movie?.original_name}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl text-white fold-bold">
            Filmmakers To Watch:
          </h1>
        </div>
      </div>
      <SavedMovies />
    </>
  );
};

export default Account;
