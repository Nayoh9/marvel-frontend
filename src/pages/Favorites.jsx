import Cookies from "js-cookie";
import { useState } from "react";

const Favorites = ({ favorites, setFavorites }) => {
  console.log(favorites);
  const [cookie, setCookie] = useState(false);

  return (
    <section>
      {favorites.map((character) => {
        console.log(character);

        return (
          <article key={character._id}>
            <img
              src={`${character.thumbnail.path}/portrait_xlarge.jpg`}
              alt=""
            />
            <p>{character.name}</p>
            <p>{character.description}</p>
            <div>
              <button
                onClick={() => {
                  const favoritesCopy = [...favorites];
                  favoritesCopy.pop(character);
                  setFavorites(favoritesCopy);
                }}
              >
                Retirer des favoris
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Favorites;

// Si State cookies =
