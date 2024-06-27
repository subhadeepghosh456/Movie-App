import React from "react";
import "./App.css";
import { FaHeart } from "react-icons/fa";
import Card from "./Components/Card";
import { useNavigate } from "react-router-dom";
import useMovieData from "./utils/useMovieData";
import { useSelector } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const favList = useSelector((store) => store.favList);

  const { results, setText, setResults, setPage } = useMovieData();

  const handleChange = (e) => {
    setText(e.target.value);
    setResults([]);
    setPage(1);
  };

  const handleNavigate = () => {
    navigate("/favorite");
  };

  return (
    <>
      <div className="fixed z-10 p-2 flex justify-around items-center w-full bg-purple-950">
        <div className=""></div>
        <div className="">
          <input
            type="text"
            placeholder="Search here...."
            onChange={handleChange}
            className="p-2 rounded-md bg-purple-700 outline-none text-white w-[200px] sm:w-[400px]"
          />
        </div>
        <div
          className="relative flex items-center justify-center cursor-pointer"
          onClick={handleNavigate}
        >
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-pink-900 rounded-full px-2 py-1 text-white text-xs">
            {favList.length}
          </span>
          <span className="text-pink-500 text-3xl cursor-pointer">
            <FaHeart />
          </span>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-5 relative top-16">
        {results.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center text-white text-3xl">
            Loading...
          </div>
        ) : (
          results?.map((item, index) => {
            return item.poster_path && <Card item={item} key={index} />;
          })
        )}
      </div>
    </>
  );
};

export default App;
