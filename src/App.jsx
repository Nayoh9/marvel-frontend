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
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Router>
      <Header isConnected={isConnected} setIsConnected={setIsConnected} />
      <Routes>
        <Route
          path={"/"}
          element={
            <Home isConnected={isConnected} setIsConnected={setIsConnected} />
          }
        />

        <Route path={"/characters"} element={<Characters />} />

        <Route
          path={"/character/:characterID"}
          element={
            <Character setFavorites={setFavorites} favorites={favorites} />
          }
        />

        <Route path={"/comics"} element={<Comics />} />

        <Route
          path={"/comic/:id"}
          element={<Comic setFavorites={setFavorites} favorites={favorites} />}
        />

        <Route
          path={"/favorites"}
          element={
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          }
        />

        <Route
          path="signup"
          element={
            <Signup isConnected={isConnected} setIsConnected={setIsConnected} />
          }
        />

        <Route
          path="signin"
          element={
            <Signin isConnected={isConnected} setIsConnected={setIsConnected} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
