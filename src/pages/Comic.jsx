// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = ({ favorites, setFavorites }) => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [userFavList, setUserFavList] = useState();

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
    <p className="loading">Loading page ...</p>
  ) : (
    <section className="comic-content">
      <section className="comic-container">
        <article className="comic">
          <img src={`${data.thumbnail.path}/portrait_xlarge.jpg`} />
          <p>{data.description}</p>
          {!isClicked ? (
            <button onClick={handleAddToFavorites}>
              Add this comic to your favorites
            </button>
          ) : (
            <button onClick={handleRemoveFromFavorites}>
              Remove this comic from your favorites
            </button>
          )}
        </article>
      </section>
    </section>
  );
};

export default Comic;
