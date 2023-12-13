// Assets import
import "./App.css";

// Package import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components import
import Header from "./components/Header";

// Pages import
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />

        <Route path={"/characters"} element={<Characters />} />

        <Route
          path={"/character/:characterID"}
          element={
            <Character setFavorites={setFavorites} favorites={favorites} />
          }
        />

        <Route
          path={"/comics"}
          element={<Comics favorites={favorites} setFavorites={setFavorites} />}
        />

        <Route path={"/comic/:id"} element={<Comic />} />

        <Route
          path={"/favorites"}
          element={
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          }
        />

        <Route path="signup" element={<Signup />} />

        <Route path="signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
