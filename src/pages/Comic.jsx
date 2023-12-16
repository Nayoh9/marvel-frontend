// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseAPI}/comic/${id}`);
      setData(response.data);
      setIsloading(false);
    };
    fetchData();
  });

  return isLoading ? (
    <p className="loading">Loading page ...</p>
  ) : (
    <section>Bienvenue sur comic</section>
  );
};

export default Comic;
