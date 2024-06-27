import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

import Card from "./Components/Card";
import { API_KEY, BASE_URL } from "./utils/constant";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const getMovieData = async () => {
    const getAll = await fetch(
      `https://api.themoviedb.org/3/movie/changes?page=${page}&&api_key=${API_KEY}`
    );
    setPage(page + 1);
    const data = await getAll.json();

    const allMoviePromises = data?.results?.map(async (item) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${item.id}?api_key=${API_KEY}`
      );

      return await response.json();
    });

    const allMovies = await Promise.all(allMoviePromises);

    setResults((prev) => [...prev, ...allMovies]);
  };

  const getSearchData = async () => {
    console.log("calling");
    const data = await fetch(
      `${BASE_URL}/search/movie?query=${text}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`
    );
    setPage(page + 1);
    const response = await data.json();
    setResults((prev) => [...prev, ...(response?.results || [])]);
  };

  const handleScrol = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 800 >
      document.documentElement.offsetHeight
    ) {
      if (!text.length) {
        getMovieData();
      }
      getSearchData();
    }
  };

  useEffect(() => {
    if (!text.length) {
      getMovieData();
    }
    getSearchData();
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
    setResults([]);
    setPage(1);
  };

  const handleNavigate = () => {
    navigate("/favorite");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrol);
    return () => {
      window.removeEventListener("scroll", handleScrol);
    };
  }, [text, page]);

  return (
    <>
      <div className="fixed z-10 p-2 flex justify-around items-center w-full bg-purple-950">
        <div className=""></div>
        <div className="">
          <input
            type="text"
            placeholder="Search here...."
            onChange={handleChange}
            className="p-2 rounded-md bg-purple-700 outline-none text-white"
          />
        </div>
        <div className="">
          <span
            className="text-pink-500 text-3xl cursor-pointer"
            onClick={handleNavigate}
          >
            <FaHeart />
          </span>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-5 relative top-16">
        {results?.map((item, index) => {
          return item.poster_path && <Card item={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default App;
