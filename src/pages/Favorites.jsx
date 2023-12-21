// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = ({ favorites, setFavorites }) => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [favEmpty, setFavEmpty] = useState(false);

  useEffect(() => {
    try {
      const fecthData = async () => {
        const response = await axios.get(`${baseAPI}/user/find`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_marvel")}`,
          },
        });

        setData(response.data);
        response.data.length === 0 && setFavEmpty(true);
        setIsloading(false);
      };
      fecthData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // console.log(data);
  return isLoading ? (
    <p className="loading">Loading page ...</p>
  ) : (
    <section className="favorites-container">
      {favEmpty && <p>Nothing here please fill your favorites !</p>}
      {data.map((elem) => {
        return (
          <Link
            to={elem.title ? `/comic/${elem._id}` : `/character/${elem._id}`}
            key={elem._id}
          >
            <article>
              <img src={`${elem.thumbnail.path}/portrait_xlarge.jpg`} alt="" />
              <p>{elem.name ? elem.name : elem.title}</p>
              <p>{elem.description}</p>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Favorites;
