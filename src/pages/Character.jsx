import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = () => {
  // Import des params de ma route
  const params = useParams();
  const id = params.comics;

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  // Je transforme le tout de chaine de caractère à tableau
  const tab = id.split(",");
  console.log(tab);

  // REPRENDRE DEMAIN RECUPERER LE TABLEAU DANS DATA POUR EN FAIRE UN MAP ET AFFICHER LES COMICS
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/comics/comics/${tab}`
      );
      setData(response.data);
      setIsloading(false);
    };

    fetchData();

    // console.log(data);
  }, []);
  console.log(data);

  return isLoading ? (
    <p>Loading page ...</p>
  ) : (
    <section className="comics-id">
      {data.map((comic) => {
        console.log(comic);
        return (
          <article key={comic._id}>
            <img
              src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
              alt="Une BD avec des super héros en couverture"
            />
          </article>
        );
      })}
    </section>
  );
};

export default Character;

// Faire une boucle
// et pour chaque index du tableau faire une requete avec pour params l'index du moment

// Envoyer les query à mon back, mon back les entre en query de la demande qu'il fait à l'API et me retourne ce que l'API lui retourne
