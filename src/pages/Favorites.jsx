import Cookies from "js-cookie";
import { useEffect } from "react";

const Favorites = ({ favorites, setFavorites }) => {
  console.log(favorites);

  return (
    <section>
      {favorites.map((character) => {
        // console.log(character);
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
                  for (let i = 0; i < favorites.length; i++) {
                    if (character.name === favorites[i].name) {
                      console.log("trouvé =>", character.name);
                      const newTab = [...favorites];
                      console.log(favorites[i]);
                      console.log(i);
                      newTab.splice(i, 1);
                      setFavorites(newTab);
                    }
                  }
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
