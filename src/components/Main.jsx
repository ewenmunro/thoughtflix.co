import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import "../index.css";

const Main = () => {
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

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
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
          <p className="my-4 text-white text-m">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-white">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
