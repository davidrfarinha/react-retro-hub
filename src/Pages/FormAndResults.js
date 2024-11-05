import React from "react";
import GameCard from "../Components/GameCard";
import { useOutletContext } from "react-router-dom";
export default function SearchGames() {

    const props = useOutletContext();
    if (!props) return null;
    const { searchQuery, handleChange, allResults, currentPage, loadingResults, querySearched, handleNavigate, handleSubmit } = props;

    // Creating a list of results from state variable allResults based on value of currentPage
    const gamesList = allResults[currentPage - 1]?.results.results;
    const gamesListArray = gamesList?.map((item) => {
        if (!item.id) return null;
        return (
            <GameCard
                key={item.id}
                itemData={item}
            />
        );
    });

    return (
        <>
            <div className="background-gradient"></div>
            <div className="search-games">
                <h2>Search your favorite Retro Games</h2>
                <form onSubmit={handleSubmit} className="search-form">
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
                {loadingResults ? (
                    <div>Loading...</div>
                ) : (gamesListArray && (
                    <>
                        {querySearched && <h2>Showing results for: {querySearched}</h2>}
                        <div className="page-navigator">
                            <div className="button-container">
                                {currentPage !== 1 &&
                                    <button
                                        className="retro-button left"
                                        id="previousPage"
                                        onClick={handleNavigate}
                                        >
                                    Previous page
                                    </button>}
                            </div>
                            <h5>Page {currentPage}</h5>
                            <div className="button-container">
                                <button
                                    className="retro-button right"
                                    id="nextPage"
                                    onClick={handleNavigate}
                                >
                                Next page
                                </button>
                            </div>
                        </div>
                        <div className="games-list-container">
                            {gamesListArray}
                            </div>
                            <div className="page-navigator">
                            <div className="button-container">
                                {currentPage !== 1 &&
                                    <button
                                        className="retro-button left"
                                        id="previousPage"
                                        onClick={handleNavigate}
                                        >
                                    Previous page
                                    </button>}
                            </div>
                            <h5>Page {currentPage}</h5>
                            <div className="button-container">
                                <button
                                    className="retro-button right"
                                    id="nextPage"
                                    onClick={handleNavigate}
                                >
                                Next page
                                </button>
                            </div>
                        </div>
                    </>)
                )}
            </div>
        </>
    );
}



// Checking if there are already results stored in cache;
// useEffect(() => {
//     const storedResults = localStorage.getItem("storedResults");
//     if (storedResults) {
//         const parsedResults = JSON.parse(storedResults);
//         setAllResults(parsedResults);
//     }
// }, []);
