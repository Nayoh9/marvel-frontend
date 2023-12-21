// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
  }, [favorites, id, currentCharacter]);

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
      <section className="character-container">
        <article className="character">
          <p>{data.name}</p>
          <img src={`${data.thumbnail.path}/portrait_xlarge.jpg`} />
          <p>{data.description}</p>
          {!isClicked ? (
            <button onClick={handleAddToFavorites}>
              Add this hero to your favorites
            </button>
          ) : (
            <button onClick={handleRemoveFromFavorites}>
              Remove this hero from your favorites
            </button>
          )}
          <p>You can find this hero in the following comics :</p>
        </article>
      </section>

      <section className="character-comics">
        {data.comics.map((comic) => {
          return (
            <article key={comic.title}>
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
                alt={`comic ${comic.title}`}
              />
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default Character;
