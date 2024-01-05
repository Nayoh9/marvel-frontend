// Dynamic adress
import baseAPI from "../utils/api";

// Component import
import Loading from "../components/Loading";

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
    <Loading />
  ) : (
    <section className="favorites">
      <div className="favorites-background"></div>
      {favEmpty ? (
        <article className="add-fav">
          <div className="no-fav">
            <img
              src="https://res.cloudinary.com/dwkwlok28/image/upload/v1704380261/marvel/captain-america-seeklogo.com_j7odqp.svg"
              alt="bouclier en spirale captain america"
            />
            <img
              src="https://res.cloudinary.com/dwkwlok28/image/upload/v1704382733/marvel/spiderman_logo_i5e7jl.svg"
              alt="arraignée noire sur fond rouge style spiderman"
            />
          </div>
          <div className="add-fav-info">
            <p className="favorites-title">
              Nothing here please fill your favorites !
            </p>
            <Link to={"/characters"}>Go to character</Link>
            <Link to={"/comics"}>Go to comics</Link>
          </div>
          <div className="no-fav">
            <img
              src="https://res.cloudinary.com/dwkwlok28/image/upload/v1704382733/marvel/spiderman_logo_i5e7jl.svg"
              alt="arraignée noire sur fond rouge style spiderman"
            />
            <img
              src="https://res.cloudinary.com/dwkwlok28/image/upload/v1704380261/marvel/captain-america-seeklogo.com_j7odqp.svg"
              alt="bouclier en spirale avec une étoile au milieu style captain america"
            />
          </div>
        </article>
      ) : (
        <p className="favorites-title">Your favorite comics / characters</p>
      )}
      <section className="favorites-container">
        {data.map((elem) => {
          return (
            <article key={elem._id} className="favorites-article">
              <Link
                to={
                  elem.title ? `/comic/${elem._id}` : `/character/${elem._id}`
                }
              >
                <div>
                  <img
                    src={`${elem.thumbnail.path}/portrait_xlarge.jpg`}
                    alt=""
                  />
                  <p>{elem.name ? elem.name : elem.title}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
      <article className="favorite-logo">
        <img
          src="https://res.cloudinary.com/dwkwlok28/image/upload/v1703682526/marvel/marvel-logo_pgsubf.svg"
          alt="marvel en blanc sur fond rouge"
        />
      </article>
    </section>
  );
};

export default Favorites;
