import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState();

  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/characters?limit=${limit}&skip=${skip}`
      );
      // console.log(response.data);
      setData(response.data.results);
      // console.log(data);
      setIsloading(false);
    };
    fetchData();
  }, [skip]);

  // Créer un query skip qui permet de passer les résulats et le récuperer coter back

  return isLoading ? (
    <p>loading page</p>
  ) : (
    <section className="characters-container">
      {data.map((character) => {
        // console.log(character.comics);

        return (
          <Link to={`/character/${character.comics}}`} key={character._id}>
            <article className="characters">
              <img
                src={`${character.thumbnail.path}/portrait_xlarge.jpg`}
                alt={`super héros ${character.name}`}
              />
              <p className="characters-name">Nom : {character.name}</p>
              <p>Description : {character.description}</p>
            </article>
          </Link>
        );
      })}
      <div>
        <button
          onClick={() => {
            setSkip(skip - limit);
          }}
          style={{ display: skip > 0 ? "flex" : "none" }}
        >
          Précédent
        </button>

        <button
          onClick={() => {
            setSkip(skip + limit);
            console.log(skip);
          }}
          style={{ display: skip >= 1400 ? "none" : "flex" }}
        >
          Suivant
        </button>
      </div>
    </section>
  );
};

export default Characters;
