// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Character = ({ favorites, setFavorites }) => {
  console.log(favorites);
  const params = useParams();
  const id = params.characterID;
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${baseAPI}/character/${id}`);
        setData(response.data);
        setIsloading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // console.log(data);

  // On envoie pas le tableau mais à tous les objets à chaque fois OU récuperer l'ancien tableau le mettre à jour et le renvoyer

  const handleAddToFavorites = async () => {
    const favoritesCopy = [...favorites];
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
        value_fav_list: favorites,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_marvel")}`,
        },
      }
    );

    console.log(response.data);
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
          <button onClick={handleAddToFavorites}>
            Add this hero to your favorites
          </button>
        </article>
      </section>

      <section className="character-comics">
        {data.comics.map((comic) => {
          return (
            <article key={comic.title}>
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
                alt={`super héros ${comic.name}`}
              />
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default Character;
