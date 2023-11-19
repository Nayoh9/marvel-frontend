import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Characters = ({ favorites, setFavorites }) => {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState();

  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  const [searchCharacter, setSearchCharacter] = useState();

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--s7xgqdjwl4w7.code.run/characters?limit=${limit}&skip=${skip}&name=${
          searchCharacter === undefined ? "" : searchCharacter
        }`
      );
      // console.log(response.data);
      setData(response.data);

      setIsloading(false);
    };
    fetchData();
  }, [skip, searchCharacter, limit]);
  // console.log(data);

  return isLoading ? (
    <p className="loading">loading page ...</p>
  ) : (
    <section className="characters">
      <div className="input">
        <input
          type="text"
          onChange={(e) => {
            setSearchCharacter(e.target.value);
          }}
        />
      </div>
      <div className="characters-container">
        {data.results.map((character) => {
          // console.log(character);

          return (
            <article key={character._id}>
              <Link to={`/character/${character.comics}}`}>
                <div>
                  <img
                    src={`${character.thumbnail.path}/portrait_xlarge.jpg`}
                    alt={`super héros ${character.name}`}
                  />
                  <p className="characters-name">Nom : {character.name}</p>
                  <p>Description : {character.description}</p>
                </div>
              </Link>
              <div className="favorites">
                <button
                  onClick={() => {
                    const favoritesCopy = [...favorites];
                    favoritesCopy.push(character);
                    console.log(favoritesCopy);
                    setFavorites(favoritesCopy);
                  }}
                >
                  Ajouter ce héros à vos favoris !
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => {
            setSkip(skip - limit);
          }}
          style={{ display: skip > 0 ? "inline" : "none" }}
        >
          Page précédente
        </button>

        <button
          onClick={() => {
            setSkip(skip + limit);
            console.log(skip);
          }}
          style={{ display: skip >= data.count - 100 ? "none" : "inline" }}
        >
          Page suivante
        </button>
      </div>
    </section>
  );
};

export default Characters;

// Créer une check box sur chacune des div, si elle est cochée on push toutes les informations du personnage dans un tableau
