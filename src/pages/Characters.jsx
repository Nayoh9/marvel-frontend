// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Characters = () => {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState({});

  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [searchCharacter, setSearchCharacter] = useState("");

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
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [skip, searchCharacter, limit]);
  console.log(data);

  const handleChangeInput = (e) => {
    let value = e.target.value;
    setSkip(0);
    setSearchParams({ search: value });
    for (let i = 0; i < value.length; i++) {
      // console.log(value[i]);
      if (value[i] === "(" || value[i] === ")" || value[i] === "*") {
        return setSearchCharacter("");
      } else {
        setSearchCharacter(value);
      }
    }
  };

  return isLoading ? (
    <p className="loading">loading page ...</p>
  ) : (
    <section className="characters">
      <div className="input">
        <input type="text" onChange={handleChangeInput} />
      </div>
      <div className="characters-container">
        {data.results.map((character) => {
          // console.log(character._id);

          return (
            <article key={character._id}>
              <Link
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
                        : "./src/assets/images/hero-noavailable.jpeg"
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
          }}
          style={{ display: skip > 0 ? "inline" : "none" }}
        >
          Previous page
        </button>

        <button
          onClick={() => {
            setSkip(skip + limit);
            // console.log(skip);
          }}
          style={{ display: skip >= data.count - 100 ? "none" : "inline" }}
        >
          Next page
        </button>
      </div>
    </section>
  );
};

export default Characters;
