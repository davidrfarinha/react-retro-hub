/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useDataContext } from "../Components/DataContextProvider";
import SearchFilter from "../Components/SearchFilter";


export default function SearchGames() {
    const { handleSetAllResults } = useDataContext();
    const navigate = useNavigate();
    const { gamePlatforms, gameGenres } = useLoaderData();
    const [searchQuery, setSearchQuery] = useState("");
    const handleChangeSearchQuery = event => setSearchQuery(event.target.value);

    const [activeFilters, setActiveFilters] = useState({});
    const handleSetActiveFilters = (activeFilters) => {
        setActiveFilters(activeFilters);
    }

    useEffect(() => {
        handleSetAllResults({}); // Resetting results
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const paramsFromFilters = (searchQuery, filters) => {
        const searchParams = new URLSearchParams({
            search: searchQuery
        });
        const extraSearchParams = {};
        const { platforms, genres, years, ratings } = filters;
        if (platforms.length > 0) {
            const stringPlatformsIds = platforms.map(item => item.id).toString();
            extraSearchParams.platforms = stringPlatformsIds;
        }
        // Handling the genres filter selection:
        if (genres.length > 0) {
            const stringGenresIds = genres.map(item => item.id).toString();
            extraSearchParams.genres = stringGenresIds;
        }
        //Handling the Years filter selection:
        const stringDates = `${years[0]}-01-01,${years[1]}-12-31`;
        extraSearchParams.dates = stringDates;
        // Handling the Metacritic rating filter selection:
        if (ratings.length === 2) {
            extraSearchParams.metacritic = ratings.toString();
        }
        for (const key in extraSearchParams) {
            searchParams.append(key, extraSearchParams[key]);
        }
        return searchParams;
    }

    const handleSubmit = event => {
        event.preventDefault();
        const currentSearchParams = `?${paramsFromFilters(searchQuery, activeFilters).toString()}`;
        navigate(`results/1${currentSearchParams}`, { state: { searchParams: currentSearchParams } });
    };

    return (
        <>
            <div className="background-gradient"></div>
            <div className="search-games">
                <h2>Search your favorite Retro Games</h2>
                <form onSubmit={handleSubmit} className="search-form">
                    <input type="text" name="searchQuery" id="searchQuery" value={searchQuery} onChange={handleChangeSearchQuery} placeholder="Type your search..." className="search-query"></input>
                    <button className="retro-button">Search</button>
                </form>
                <SearchFilter
                    gamePlatforms={gamePlatforms}
                    gameGenres={gameGenres}
                    filterType={"search"}
                    handleSetActiveFilters={handleSetActiveFilters}
                />
            </div>
        </>
    );
}

