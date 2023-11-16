import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  const [searchComic, setSearchComic] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/comics?limit=${limit}&skip=${skip}&title=${
          searchComic === undefined ? "" : searchComic
        }`
      );
      setData(response.data);
      setIsloading(false);
    };
    fetchData();
  }, [skip, searchComic]);

  console.log(data);

  return isLoading ? (
    <p>Loading page ...</p>
  ) : (
    <section>
      <input
        type="text"
        onChange={(e) => {
          setSearchComic(e.target.value);
        }}
      />
      <div className="comics-container">
        {data.results.map((comic) => {
          // console.log(comic);
          return (
            <article key={comic._id} className="comics">
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
                alt={`image de la BD dont le titre est ${comic.title}`}
              />
              <p>{comic.title}</p>
              <p>{comic.description}</p>
            </article>
          );
        })}
        <div>
          <button
            onClick={() => {
              setSkip(skip - limit);
              console.log(skip);
            }}
            style={{ display: skip === 0 ? "none" : "inline" }}
          >
            Page précédente
          </button>

          <button
            onClick={() => {
              setSkip(skip + limit);
              console.log(skip);
            }}
            style={{ display: skip === data.count - 100 ? "none" : "inline" }}
          >
            Page suivante
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comics;
