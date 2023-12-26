// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Comics = ({ favorites, setFavorites }) => {
  window.scrollTo(0, 0);
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [searchComic, setSearchComic] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${baseAPI}/comics?limit=${limit}&skip=${skip}&title=${
            searchComic === undefined ? "" : searchComic
          }`
        );
        setData(response.data);
        setIsloading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [skip, searchComic]);

  // console.log(data);

  const handleChangeInput = (e) => {
    let value = e.target.value;
    setSkip(0);
    setCurrentPage(1);
    for (let i = 0; i < value.length; i++) {
      // console.log(value[i]);
      if (value[i] === "(" || value[i] === ")" || value[i] === "*") {
        return setSearchComic("");
      }
      setSearchComic(value);
    }
    setSearchParams({ search: value, page: currentPage });
  };

  return isLoading ? (
    <p className="loading">Loading page ...</p>
  ) : (
    <section className="comics">
      <div className="input">
        <input
          type="text"
          onChange={handleChangeInput}
          placeholder="search for a comic..
"
        />
      </div>

      <div className="comics-container">
        {data.results.map((comic) => {
          // console.log(comic);
          return (
            <article key={comic._id}>
              <Link
                className="redirects"
                to={
                  Cookies.get("token_marvel")
                    ? `/comic/${comic._id}`
                    : "/signin"
                }
              >
                <div>
                  <img
                    src={
                      comic.thumbnail.extension === "jpg"
                        ? `${comic.thumbnail.path}.jpg`
                        : "https://res.cloudinary.com/dwkwlok28/image/upload/v1703163367/c5d0j21rtliuduc0sddv.jpg"
                    }
                    alt={`picture of the comic ${comic.title}`}
                  />
                  <p className="comics-name">{comic.title}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <div className="comics-button">
        <button
          onClick={() => {
            setSkip(skip - limit);
            setCurrentPage(currentPage - 1);
            setSearchParams({ search: searchComic, page: currentPage - 1 });

            // console.log(skip);
          }}
          style={{ display: skip === 0 ? "none" : "inline" }}
        >
          <a href="#anchor">Previous page</a>
        </button>
        <span style={{ display: skip >= data.count - 100 ? "none" : "inline" }}>
          {currentPage}
        </span>
        <button
          onClick={() => {
            setSkip(skip + limit);
            setCurrentPage(currentPage + 1);
            setSearchParams({ search: searchComic, page: currentPage + 1 });
            // setSearchParams({ search: searchCharacter, page: currentPage + 1 });
            // console.log(skip);
          }}
          style={{ display: skip >= data.count - 100 ? "none" : "inline" }}
        >
          <a href="#anchor">Next page</a>
        </button>
      </div>
    </section>
  );
};

export default Comics;
