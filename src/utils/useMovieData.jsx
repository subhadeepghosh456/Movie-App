import { useState, useEffect, useCallback } from "react";
import { API_KEY, BASE_URL } from "./constant";

import { throttle } from "./throttle";
import useDebounce from "./useDebounce";

const useMovieData = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);

  const getMovieData = useCallback(async () => {
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
  }, [page]);

  const getSearchData = useCallback(async () => {
    const data = await fetch(
      `${BASE_URL}/search/movie?query=${text}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`
    );
    setPage(page + 1);
    const response = await data.json();
    setResults((prev) => [...prev, ...(response?.results || [])]);
  }, [text, page]);

  useEffect(() => {
    if (!text.length) {
      getMovieData();
    }
    getSearchData();
  }, [debouncedText]);

  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 800 >
        document.documentElement.offsetHeight
      ) {
        if (!text.length) {
          getMovieData();
        } else {
          getSearchData();
        }
      }
    }, 500),
    [text, getMovieData, getSearchData]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [text, page]);

  return {
    results,
    setText,
    setResults,
    setPage,
  };
};

export default useMovieData;
