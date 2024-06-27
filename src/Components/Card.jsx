import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IMAGE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addToFav } from "../utils/favSlice";

const Card = ({ item }) => {
  const favList = useSelector((store) => store.favList);
  const isPresent = favList.some((lisItem) => lisItem.id === item.id);
  const dispatch = useDispatch();
  const handleClick = (item) => {
    // console.log(item);
    dispatch(addToFav(item));
  };
  return (
    <div className="rounded-md w-full sm:w-60 md:w-72 lg:w-80 xl:w-96 bg-purple-950 m-2">
      <div className="w-full h-72 sm:h-80 md:h-96 lg:h-104 xl:h-120 rounded-t-md overflow-hidden">
        <img
          src={IMAGE_URL + item.poster_path}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="w-full truncate text-white font-bold text-center">
        Title: {item.title || "N / A"}
      </p>
      <p className="text-white font-bold text-center">
        Date:{item.release_date || "N / A"}
      </p>

      <p className="flex justify-end">
        <span
          className=" text-3xl p-2 m-2 cursor-pointer text-yellow-400 w-10 h-10 bg-slate-900 rounded-full flex justify-center items-center"
          onClick={() => handleClick(item)}
        >
          {" "}
          {isPresent ? <FaHeart /> : <FaRegHeart />}
        </span>
      </p>
    </div>
  );
};

export default Card;
