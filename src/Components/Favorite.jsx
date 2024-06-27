import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Favorite = () => {
  const favList = useSelector((store) => store.favList);

  const handleNavigate = () => {
    navigate("/favorite");
  };
  return (
    <>
      <div className="fixed z-10 p-2 flex justify-around items-center w-full bg-purple-950">
        <Link to={"/"}>
          <div className="text-3xl text-white">Home</div>
        </Link>

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
        {!favList || favList.length === 0 ? (
          <h1 className="text-center text-3xl text-white">No Items there</h1>
        ) : (
          favList?.map((item, index) => {
            return item.poster_path && <Card item={item} key={index} />;
          })
        )}
      </div>
    </>
  );
};

export default Favorite;
