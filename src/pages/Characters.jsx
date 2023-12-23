// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Characters = () => {
  window.scrollTo(0, 0);
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState({});

  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${baseAPI}/characters?limit=${limit}&skip=${skip}&name=${
            searchCharacter === undefined ? "" : searchCharacter
          }`
        );
        // console.log(response.data);
        setData(response.data);
        setIsloading(false);
        window.scrollTo(0, 0);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [skip, searchCharacter, limit]);
  // console.log(data);

  const handleChangeInput = (e) => {
    let value = e.target.value;
    setSkip(0);
    setCurrentPage(1);
    for (let i = 0; i < value.length; i++) {
      // console.log(value[i]);
      if (value[i] === "(" || value[i] === ")" || value[i] === "*") {
        return setSearchCharacter("");
      }
      setSearchCharacter(value);
    }
    setSearchParams({ search: value, page: currentPage });
  };

  return isLoading ? (
    <p className="loading">loading page ...</p>
  ) : (
    <section className="characters">
      <div className="input">
        <input
          type="text"
          onChange={handleChangeInput}
          placeholder="Search for a hero..
"
        />
      </div>
      <div className="characters-container">
        {data.results.map((character) => {
          // console.log(character._id);

          return (
            <article key={character._id}>
              <Link
                className="redirects"
                to={
                  Cookies.get("token_marvel")
                    ? `/character/${character._id}`
                    : "/signin"
                }
              >
                <div>
                  <img
                    src={
                      character.thumbnail.extension === "jpg"
                        ? `${character.thumbnail.path}/portrait_xlarge.jpg`
                        : "https://res.cloudinary.com/dwkwlok28/image/upload/v1703163367/c5d0j21rtliuduc0sddv.jpg"
                    }
                    alt={`super hero ${character.name}`}
                  />
                  <p className="characters-name">{character.name}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <div className="characters-button">
        <button
          onClick={() => {
            setSkip(skip - limit);
            setCurrentPage(currentPage - 1);
            setSearchParams({
              search: searchCharacter,
              page: currentPage - 1,
            });
          }}
          style={{ display: skip > 0 ? "inline" : "none" }}
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
            setSearchParams({
              search: searchCharacter,
              page: currentPage + 1,
            });
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

export default Characters;
