// Dynamic adress
import baseAPI from "../utils/api";

// Component import
import Loading from "../components/Loading";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comic = ({ favorites, setFavorites }) => {
  window.scrollTo(0, 0);
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [userFavList, setUserFavList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Infomations about the comic
      const response = await axios.get(`${baseAPI}/comic/${id}`);
      setData(response.data);
      setIsloading(false);

      // DB fav_list informations of the user
      const secondResponse = await axios.get(`${baseAPI}/user/find`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_marvel")}`,
        },
      });
      // console.log(secondResponse.data);
      setUserFavList(secondResponse.data);
    };
    fetchData();
  }, [favorites, id]);

  useEffect(() => {
    if (userFavList) {
      const existInFavList = userFavList.find(
        (element) => element._id === data._id
      );
      // console.log(existInFavList);
      if (existInFavList) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }
  }, [userFavList, id]);

  // console.log(data);
  // console.log(userFavList);

  const handleAddToFavorites = async () => {
    const favoritesCopy = [...userFavList];
    favoritesCopy.push({
      _id: data._id,
      title: data.title,
      thumbnail: data.thumbnail,
    });
    // console.log(favoritesCopy);
    setFavorites(favoritesCopy);

    const response = await axios.put(
      `${baseAPI}/user/update`,
      {
        key_fav_list: "fav_list",
        value_fav_list: favoritesCopy,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_marvel")}`,
        },
      }
    );
    // console.log(response.data);
  };

  const handleRemoveFromFavorites = async () => {
    const favoritesCopy = [...userFavList];
    for (let i = 0; i < favoritesCopy.length; i++) {
      if (favoritesCopy[i]._id === data._id) {
        favoritesCopy.splice(i, 1);
        setFavorites(favoritesCopy);
        setIsClicked(false);
      }
    }

    const response = await axios.put(
      `${baseAPI}/user/update`,
      {
        key_fav_list: "fav_list",
        value_fav_list: favoritesCopy,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_marvel")}`,
        },
      }
    );

    // console.log(response.data);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className="comic-content">
      <div className="comic-background"></div>
      <section className="comic-container">
        <Link to={"/comics"} className="goback-button">
          <div>
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            <p>Back to comics</p>
          </div>
        </Link>

        <Link to={"/comics"} className="goback-mobile">
          <div>
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            <p>Back</p>
          </div>
        </Link>
        <article className="comic">
          <p>{data.title}</p>
          <img src={`${data.thumbnail.path}/portrait_xlarge.jpg`} />
          <p>
            {data.description
              ? data.description
              : "This comic has no description.."}
          </p>
          {!isClicked ? (
            <div className="comic-button">
              <button onClick={handleAddToFavorites} className="add">
                Add this comic to your favorites
              </button>
              <FontAwesomeIcon
                icon="fa-regular fa-heart"
                style={{ color: "darkred" }}
                className="heart"
              />
            </div>
          ) : (
            <div className="comic-button">
              <button onClick={handleRemoveFromFavorites} className="remove">
                Remove this comic from your favorites
              </button>
              <FontAwesomeIcon
                icon="fa-solid fa-heart"
                style={{ color: "darkred" }}
                className="heart"
              />
            </div>
          )}
          <p></p>
        </article>
      </section>
    </section>
  );
};

export default Comic;
