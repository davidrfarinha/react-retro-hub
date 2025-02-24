import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate, useLocation, useLoaderData } from "react-router-dom";
import { useDataContext } from "../Components/DataContextProvider";
import { assetsLoader } from "../utils/helperFunctions";
import ResultsFilter from "../Components/ResultsFilter";
import ResultsSort from "../Components/ResultsSort";
import GameCard from "../Components/GameCard";
import { fetchGames } from "../utils/fetchData"

export async function loader({ request, params, allResults, handleSetAllResults }) {
    console.log("Results loader function ran!");
    const url = new URL(request.url);
    const searchParametersString = url?.search;
    const currentPage = params?.pageNumber;
    const searchParams = new URLSearchParams(searchParametersString);
    const searchParameters = {
        search: searchParams.get("search"),
        platforms: searchParams.get("platforms"),
        genres: searchParams.get("genres"),
        dates: searchParams.get("dates"),
        metacritic: searchParams.get("metacritic"),
    };
    if (!allResults[currentPage] && currentPage && searchParameters) {
        try {
            const fetchedGames = await fetchGames(currentPage, searchParameters);
            console.log(fetchedGames);
            if (fetchedGames?.results) {
                handleSetAllResults(prevResults => ({
                    ...prevResults,
                    [currentPage]: fetchedGames
                }))
            }
        } catch (error) {
            console.log("Unable to fetch game data!")
            console.error(error);
        }
    }
    return assetsLoader();
}

export default function ResultsPage() {
    const navigate = useNavigate();
    const { gamePlatforms, gameGenres } = useLoaderData();

    const { allResults } = useDataContext();
    const currentPage = useParams().pageNumber;
    const gamesList = allResults[currentPage]?.results;



    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        filtersEnabled: false,
        filters: null
    });
    const handleActiveFilters = value => setActiveFilters(value);
    
    const [showSort, setShowSort] = useState(false);


    const [searchParams] = useSearchParams();
    const searchParameters = {
        search: searchParams.get("search"),
        platforms: searchParams.get("platforms"),
        genres: searchParams.get("genres"),
        dates: searchParams.get("dates"),
        metacritic: searchParams.get("metacritic"),
    };
    console.log(searchParameters);



    const handleBackToSearch = () => {
        navigate("/search");
    }



    const location = useLocation();
    const searchParamsToSend = location?.search;
    const handleNavigate = (event) => {
        const id = event.target.id;
        const currentPageNumber = parseInt(currentPage);
        const offset = id === "previousPage" ? -1 : 1;
        navigate({
            pathname: `/search/results/${currentPageNumber + offset}`,
            search: searchParamsToSend
        })
    }
    const handleShowFilters = () => {
        setShowFilters(prev => !prev);
    }
    const handleShowSort = () => {
        setShowSort(prev => !prev);
    }

    const pageNavigator = (
        <div className="page-navigator">
            <div className="button-container">
                {parseInt(currentPage) !== 1 &&
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
                {allResults[currentPage]?.next && (
                    <button
                        className="retro-button right"
                        id="nextPage"
                        onClick={handleNavigate}
                    >
                        Next page
                    </button>
                )}
            </div>
        </div>
    );

    let shownGamesList = [];
    if (activeFilters.filtersEnabled) {
        console.log("filters enabled")
        shownGamesList = gamesList?.filter(item => {
            const itemYear = new Date(item.released).getFullYear();
            const gameGenres = item.genres.map(item => item.slug);
            const { selectedGenre, selectedDate, selectedRating } = activeFilters.filters;

            const genreMatches = selectedGenre ? gameGenres.includes(selectedGenre) : true;
            const dateMatches = selectedDate ? itemYear >= selectedDate[0] && itemYear <= selectedDate[1] : true;
            const ratingMatches = selectedRating ? item.rating >= selectedRating[0] && item.rating <= selectedRating[1] : true;
            return genreMatches && ratingMatches && dateMatches;
        });
    } else {
        shownGamesList = gamesList;
    }

    console.log(shownGamesList);
    const gamesListArray = shownGamesList?.map((item) => (
        <GameCard
            key={item.id}
            itemData={item}
            searchParams={searchParamsToSend}
            currentGamesList={shownGamesList}
        />
    ));

    return (
        <div className="results-container">
            
            
            
            
            {/* IMPORTANT: CHANGE THIS TO LINK!!!!!!!!!!!!!!!!!!!!!!!!*/}
            <button
                onClick={handleBackToSearch}
                className="retro-button back-to-search left"
            >
                Back to search
            </button>




            <h2>Results</h2>
            {!searchParameters.search ?
                <h3>No search query entered. Showing all results.</h3>
                :
                <>
                    <h3>Showing results for:</h3>
                    <h2>{searchParameters.search}</h2>
                </>
            }
            <button
                className="manage-results"
                onClick={handleShowFilters}
            >
                Filter
            </button>
            <button
                className="manage-results"
                onClick={handleShowSort}
            >
                Sort
            </button>
            {showFilters && (
                <ResultsFilter
                    gameGenres={gameGenres}
                    handleActiveFilters={handleActiveFilters}
                />
            )}
            {showSort && <ResultsSort />}
            {pageNavigator}
            <div className="games-list-container">
                {gamesListArray && gamesListArray.length > 0 ? gamesListArray : <h3>No results to show. Try clearing filters or making a new search.</h3>}
            </div>
            {gamesListArray && gamesListArray.length > 0 && pageNavigator}
        </div>
    );
}