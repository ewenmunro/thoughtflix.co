import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ item }) => {
  const [save, setSave] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const { user } = UserAuth();

  const movieId = doc(db, "users", `${user?.email}`);

  const savedMovies = async () => {
    if (user?.email) {
      setSave(!save);
      setWatchLater(true);
      await updateDoc(movieId, {
        savedMovies: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Log in to save a movie");
    }
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-[160px] sm:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
        alt={item?.title || item?.name || item?.original_name}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-white/80 opacity-0 hover:opacity-100 text-gray-800">
        <p className="white-space-normal text-xs md:text-sm font-bold text-gray-800 flex justify-center items-center h-full text-center">
          {truncateString(item?.title, 30)}
        </p>
        <p onClick={savedMovies}>
          {save ? (
            <FaHeart className="absolute top-4 left-4 text-gray-800" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-800" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
