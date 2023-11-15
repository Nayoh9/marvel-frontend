import "./App.css";

// Components
import Header from "./components/Header";

// Pages
import Characters from "./pages/Characters";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/characters"} element={<Characters />} />
      </Routes>
    </Router>
  );
}

export default App;
