import React from "react";
import GameCard from "../Components/GameCard";
import { useState, useEffect } from "react";
import { fetchGames, gamesPlatforms } from "../utils.js/fetchData";
export default function SearchGames() {
    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = (event) => setSearchQuery(event.target.value);
    const [results, setResults] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);
    const [querySearched, setQuerySearched] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoadingResults(true);
        setQuerySearched(searchQuery);
        fetchGames(searchQuery).then((data) => {
            localStorage.setItem("storedResults", JSON.stringify(data));
            console.log(data);
            setResults(data);
            setLoadingResults(false);
            setSearchQuery("");
        });
    };

    useEffect(() => {
        const storedResults = localStorage.getItem("storedResults");
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        }

    }, []);

    const gamesList = results.results;
    const gamesListArray = gamesList?.map((item) => {
        return (
            <GameCard
                key={item.id}
                itemData={item}
            />
        );
    });

    return (
        <div className="search-games">
            <h2>Search your favorite Game Boy Games</h2>
            <form
                onSubmit={handleSubmit}
                className="search-form"
            >
                {/* <label htmlFor="searchQuery">Type your search</label> */}
                <input
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Type your search..."
                ></input>
                <button className="retro-button">Search</button>
            </form>
            {loadingResults ? <div>Loading...</div> : <div className="games-list-container">
                <h2>Showing results for: {querySearched}</h2>{gamesListArray}</div>}
        </div>
    );
}
