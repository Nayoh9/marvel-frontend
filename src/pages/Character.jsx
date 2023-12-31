// Dynamic adress
import baseAPI from "../utils/api";

// Component import
import Loading from "../components/Loading";
import ModalComic from "../components/ModalComic";

// Package import
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({ favorites, setFavorites }) => {
  window.scrollTo(0, 0);
  const params = useParams();
  const id = params.characterID;

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [userFavList, setUserFavList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comicID, setComicID] = useState("");
  useEffect(() => {
    try {
      // Infomations about the character
      const fetchData = async () => {
        const response = await axios.get(`${baseAPI}/character/${id}`);
        setData(response.data);
        setIsloading(false);

        // console.log(response.data);

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

  // console.log(data);

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
    <Loading />
  ) : (
    <section className="character-content">
      {isModalOpen ? (
        <ModalComic comicID={comicID} setIsModalOpen={setIsModalOpen} />
      ) : (
        ""
      )}

      <div className="character-background"></div>
      <Link to={"/characters"} className="goback-button">
        <div>
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          <p>Back to characters</p>
        </div>
      </Link>

      <Link to={"/characters"} className="goback-mobile">
        <div>
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          <p>Back</p>
        </div>
      </Link>
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
          {data.comics.length === 0 ? (
            <p>No comics found for this character</p>
          ) : (
            <p>You can find this character in the comics below.</p>
          )}
        </article>
      </section>

      {data.comics.length === 0 ? (
        ""
      ) : (
        <section className="character-comics">
          {data.comics.map((comic) => {
            return (
              <article className="single-comic" key={comic.title}>
                <img
                  src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
                  alt={`comic ${comic.title}`}
                  onClick={() => {
                    console.log(comic);
                    setComicID(comic);
                    setIsModalOpen(true);
                  }}
                />
                <p>{comic.title}</p>
              </article>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default Character;
