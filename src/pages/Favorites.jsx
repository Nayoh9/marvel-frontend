// Package import
import { useEffect } from "react";

const Favorites = ({ favorites, setFavorites }) => {
  useEffect(() => {
    console.log(favorites);
  }, []);

  return (
    <section>
      {favorites.map((elem) => {
        return (
          <article key={elem._id}>
            <img src={`${elem.thumbnail.path}/portrait_xlarge.jpg`} alt="" />
            <p>{elem.name}</p>
            <p>{elem.description}</p>
            <div>
              <button
                onClick={() => {
                  console.log(elem._id);
                  for (let i = 0; i < favorites.length; i++) {
                    if (elem._id === favorites[i]._id) {
                      console.log("trouvé =>", elem._id);
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
