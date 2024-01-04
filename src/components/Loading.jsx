// Package import
import MoonLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <section className="loading">
      <p>Loading page...</p>
      <MoonLoader color="darkred" />
    </section>
  );
};

export default Loading;
