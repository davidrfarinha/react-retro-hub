import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SearchGames from "./Pages/SearchGames";
import SearchForm from "./Pages/SearchForm"
import GameDetailLayout from "./Pages/GameDetailLayout";
import Contacts from "./Pages/Contacts";
import GameOverview from "./Pages/GameOverview";
import GameInfo from "./Pages/GameInfo";
import GameRatings from "./Pages/GameRatings"
import GameScreenshots from "./Pages/GameScreenshots";
import NotFound from "./Pages/NotFound";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="searchgames" element={<SearchGames />} >
                        <Route index element={<SearchForm />} />
                        <Route path=":slug" element={<GameDetailLayout />}>
                            <Route index element={<GameOverview />} />
                            <Route path="game-info" element={<GameInfo />} />
                            <Route path="ratings" element={<GameRatings />} />
                            <Route path="screenshots" element={<GameScreenshots />} />
                        </Route>
                    </Route>
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
