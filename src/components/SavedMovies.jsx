import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteMovie = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.error(error);
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
    <>
      <h2 className="text-gray-800 fold-bold md:text-xl p-4">Watch Later</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-gray-800 left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies
            .filter((item) => item?.backdrop_path !== null)
            .map((item, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/original/${item?.img}`}
                  alt={item?.title || item?.name || item?.original_name}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-white/80 opacity-0 hover:opacity-100 text-gray-800">
                  <p className="white-space-normal text-xs md:text-sm font-bold text-gray-800 flex justify-center items-center h-full text-center">
                    {truncateString(item?.title, 30)}
                  </p>
                  <p
                    onClick={() => deleteMovie(item.id)}
                    className="absolute text-gray-800 top-4 right-4"
                  >
                    <AiOutlineClose />
                  </p>
                </div>
              </div>
            ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-gray-800 right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default SavedMovies;
