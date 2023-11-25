import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = () => {
  // Import des params de ma route

  const params = useParams();
  const id = params.comics;

  // console.log(id);

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(
      //   `https://site--marvel-backend--s7xgqdjwl4w7.code.run/character/${id}`
      // );

      const response = await axios.get(`http://localhost:3000/character/${id}`);
      setData(response.data);
      setIsloading(false);
    };
    fetchData();
  }, []);

  console.log(data);

  return isLoading ? (
    <p className="loading">Loading page ...</p>
  ) : (
    <section className="character">
      <article>
        <p>{data.name}</p>
        <img src={`${data.thumbnail.path}/portrait_xlarge.jpg`} />
        <p>{data.description}</p>
      </article>

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
  );
};

export default Character;
