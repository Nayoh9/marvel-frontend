// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = ({ favorites, setFavorites }) => {
  console.log(favorites);
  const params = useParams();
  const id = params.characterID;

  // console.log(id);

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

  console.log(data);

  return isLoading ? (
    <p className="loading">Loading page ...</p>
  ) : (
    <section className="character-content">
      <section className="character-container">
        <article className="character">
          <p>{data.name}</p>
          <img src={`${data.thumbnail.path}/portrait_xlarge.jpg`} />
          <p>{data.description}</p>
          <button
            onClick={() => {
              const favoritesCopy = [...favorites];
              favoritesCopy.push(data);
              console.log(favoritesCopy);
              setFavorites(favoritesCopy);
            }}
          >
            Ajouter ce héros à vos favoris !
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
