// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comics = ({ favorites, setFavorites }) => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  const [searchComic, setSearchComic] = useState();

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

  return isLoading ? (
    <p className="loading">Loading page ...</p>
  ) : (
    <section className="comics">
      <div className="input">
        <input
          type="text"
          onChange={(e) => {
            setSearchComic(e.target.value);
          }}
        />
      </div>

      <div className="comics-container">
        {data.results.map((comic) => {
          // console.log(comic);
          return (
            <article key={comic._id}>
              <Link
                to={
                  Cookies.get("token_marvel")
                    ? `/comic/${comic._id}`
                    : "/signin"
                }
              >
                <div className="comic">
                  <img
                    src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
                    alt={`image de la BD dont le titre est ${comic.title}`}
                  />
                  <p className="comics-name">Titre :{comic.title}</p>
                </div>
              </Link>
            </article>
          );
        })}

        <div>
          <button
            onClick={() => {
              setSkip(skip - limit);
              console.log(skip);
            }}
            style={{ display: skip === 0 ? "none" : "inline" }}
          >
            Next page
          </button>

          <button
            onClick={() => {
              setSkip(skip + limit);
              console.log(skip);
            }}
            style={{ display: skip === data.count - 100 ? "none" : "inline" }}
          >
            Previous page
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comics;
