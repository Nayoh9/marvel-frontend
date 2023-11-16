import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";

// Pages
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import { useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/characters"}
          element={
            <Characters favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route path={"/character/:comics"} element={<Character />} />
        <Route
          path={"/comics"}
          element={<Comics favorites={favorites} setFavorites={setFavorites} />}
        />
        <Route
          path={"/favorites"}
          element={
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
