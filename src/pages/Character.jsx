// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({ favorites, setFavorites }) => {
  const params = useParams();
  const id = params.characterID;

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [userFavList, setUserFavList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    try {
      // Infomations about the character
      const fetchData = async () => {
        const response = await axios.get(`${baseAPI}/character/${id}`);
        setData(response.data);
        setIsloading(false);

        console.log(response.data);

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
    } catch (error) {
      console.log(error.message);
    }
  }, [favorites, id]);

  // console.log("userfavlist >>", userFavList);

  // To verify if a favorites is existing in the fav_list array

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

  // console.log(data._id);

  const handleAddToFavorites = async () => {
    const favoritesCopy = [...userFavList];
    favoritesCopy.push({
      _id: data._id,
      name: data.name,
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
    <section className="character-content">
      <div className="character-background"></div>
      <section className="character-container">
        <article className="character">
          <p className="character-name">{data.name}</p>
          <img src={`${data.thumbnail.path}/portrait_xlarge.jpg`} />
          <p className="character-description">
            {data.description
              ? data.description
              : "This character has no description.."}
          </p>

          {!isClicked ? (
            <div className="character-button">
              <button onClick={handleAddToFavorites} className="add">
                Add this hero to your favorites
              </button>
              <FontAwesomeIcon
                icon="fa-regular fa-heart"
                style={{ color: "darkred" }}
                className="heart"
              />
            </div>
          ) : (
            <div className="character-button">
              <button onClick={handleRemoveFromFavorites} className="remove">
                Remove this hero from your favorites
              </button>
              <FontAwesomeIcon
                icon="fa-solid fa-heart"
                style={{ color: "darkred" }}
                className="heart"
              />
            </div>
          )}
          <p>You can find this hero in the comics below.</p>
        </article>
      </section>

      <section className="character-comics">
        {data.comics.map((comic) => {
          return (
            <article className="single-comic" key={comic.title}>
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
                alt={`comic ${comic.title}`}
              />
              <p>{comic.title}</p>
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default Character;
