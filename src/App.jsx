import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";

// Pages
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import Character from "./pages/Character";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/characters"} element={<Characters />} />
        <Route path={"/character/:comics"} element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;
