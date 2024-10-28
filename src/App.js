import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SearchGames from "./Pages/SearchGames";
import GameDetail from "./Pages/GameDetail"
import Contacts from "./Pages/Contacts";

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className="main-container">
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/about"
                        element={<About />}
                    />
                    <Route
                        path="/searchgames"
                        element={<SearchGames />}
                    />
                    <Route
                        path="/searchgames/:slug"
                        element={<GameDetail />}
                    />
                    <Route
                        path="/contacts"
                        element={<Contacts />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
