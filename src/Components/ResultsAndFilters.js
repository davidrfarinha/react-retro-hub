import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import GameCard from "./GameCard";

export default function ResultsAndFilters(props) {
    const { allGameGenres, gamesList, allResults, queryString, currentPage } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [minMaxShownGamesDates, setMinMaxShownGamesDates] = useState([]);
    const [sliderValue, setSliderValue] = useState([1947, 2024]);
    const genresFilterValue = searchParams.get("genres");
    const ratingFilterValue = searchParams.get("rating");
    const dateFilterValue = searchParams.get("date")?.split(",");

    
    useEffect(() => {
        if (gamesList) {
            const allGamesDates = gamesList?.map(item => {
                const itemReleaseDate = new Date(item.released);
                return itemReleaseDate.getFullYear();
            });
            const minMaxGamesDates = allGamesDates && ([Math.min(...allGamesDates), Math.max(...allGamesDates)]);
            setMinMaxShownGamesDates(minMaxGamesDates);
            setSliderValue(minMaxGamesDates);
        }

    }, [gamesList]);

    const handleClearFilters = () => {
        setSearchParams(prevParams => {
            prevParams.delete("genres");
            prevParams.delete("rating");
            prevParams.delete("date");
            return prevParams;
        })

    }
    const handleNavigate = (event) => {
        handleClearFilters();
        const id = event.target.id;
        const currentPageNumber = parseInt(currentPage);
        if (id === "previousPage") {
            setSearchParams(prevParams => {
                prevParams.set("page", currentPageNumber - 1);
                return prevParams;
            });
        } else if (id === "nextPage") {
            setSearchParams(prevParams => {
                prevParams.set("page", currentPageNumber + 1);
                return prevParams
            });
        }
    }

    const handleFilters = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setSearchParams(prevParams => {
            prevParams.set(name, value);
            return prevParams;
        })
    }






    // Getting the genres of the games in games list;
    const gamesListGenres = gamesList.map(item => item.genres).flat();
    // Extracting the slugs of game genres of previous list;
    const gamesListGenresSlugs = gamesListGenres.map(item => item.slug);
    // Filtering the array with all the genres in order to display only the genres of the games shown in dropdown menu;
    const shownGameGenres = allGameGenres.filter(item => gamesListGenresSlugs.includes(item.slug));

    const genreFilterDropdownMenu = (
        shownGameGenres.length !== 0 && (
            <form className="filter genre">
                <h5>Genre</h5>
                <select
                    className="filter-input"
                    name="genres"
                    id="genres"
                    onChange={handleFilters}
                    value={genresFilterValue || "Choose an option"}
                    placeholder="Choose an option"
                >
                    {shownGameGenres.map(item =>
                        <option
                            key={item.id}
                            value={item.slug}
                        >
                            {item.name}
                        </option>)}
                </select>
            </form>
        ));
    
    
    
    
    const ratings = [1, 2, 3, 4]
    const ratingFilterDropdownMenu = (
        <form className="filter rating">
            <h5>Ratings</h5>
            <select className="filter-input" name="rating" id="rating" onChange={handleFilters}>
                {ratings.map(item => <option key={item} value={item}>{`${item} and above`}</option>)}
            </select>
        </form>
    );

    const handleSliderChange = value => {
        setSliderValue(value);
        setSearchParams(prevParams => {
            prevParams.set("date", value)
            return prevParams
        })
    };
    const dateFilterSliderMenu = (
        <div className="filter date">
            <h5>Date range</h5>
            <div className="slider-wrapper">
                <div className="date-range">
                    <p>From</p>
                    <p className="date-range-value">{sliderValue?.[0]}</p>
                </div>
                <div className="slider ">
                    <ReactSlider
                        value={sliderValue}
                        key={minMaxShownGamesDates.join(',')}
                        className="horizontal-slider"
                        thumbClassName="slide-thumb"
                        trackClassName="slide-track"
                        min={minMaxShownGamesDates?.[0]}
                        max={minMaxShownGamesDates?.[1]}
                        defaultValue={[minMaxShownGamesDates?.[0], minMaxShownGamesDates?.[1]]}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        pearling
                        minDistance={1}
                        onChange={handleSliderChange}
                    />
                </div>
                <div className="date-range">
                    <p>To</p>
                    <p className="date-range-value">{sliderValue?.[1]}</p>
                </div>
            </div>
        </div>
    );
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
                {allResults[currentPage].next && (
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

    const filtersEnabled = genresFilterValue || ratingFilterValue || dateFilterValue;
    let filteredGamesList = [];

    if (filtersEnabled) {
        filteredGamesList = gamesList?.filter(item => {
            const itemDate = new Date(item.released);
            const itemYear = itemDate.getFullYear();
            const minFilterDate = dateFilterValue?.[0];
            const maxFilterDate = dateFilterValue?.[1];
            const gameGenres = item.genres.map(item => item.slug);

            const genreMatches = genresFilterValue ? gameGenres.includes(genresFilterValue) : true;
            const ratingMatches = ratingFilterValue ? item.rating >= ratingFilterValue : true;
            const dateMatches = dateFilterValue ? itemYear >= minFilterDate && itemYear <= maxFilterDate : true;
            return genreMatches && ratingMatches && dateMatches;
        })
    }

    const gamesListArray = filtersEnabled ?
        filteredGamesList.map((item) => <GameCard key={item.id} itemData={item} />) :
        gamesList?.map((item) => <GameCard key={item.id} itemData={item} />)

    return (
        <>
            {!queryString ? <h3>No search query entered. Showing all available data:</h3> : <h3>Showing results for: {queryString}</h3>}
            {allGameGenres.length !== 0 &&
                (
                    <div className="filters-container">
                        <h4 className="filters-heading">Filter results by:</h4>
                        {genreFilterDropdownMenu}
                        {ratingFilterDropdownMenu}
                        {dateFilterSliderMenu}
                        <button className="clear-filters-button" onClick={handleClearFilters}>Clear filters</button>
                    </div>
                )
            }
            {pageNavigator}
            <div className="games-list-container">
                {gamesListArray.length > 0 ? gamesListArray : <h3>No results to show. Try clearing filters or making a new search.</h3>}
            </div>
            {/* Second page navigator should show only when results are shown */}
            {gamesListArray.length !== 0 && pageNavigator}

        </>
    );
}
ResultsAndFilters.propTypes = {
    allGameGenres: PropTypes.array.isRequired,
    gamesList: PropTypes.array.isRequired,
    allResults: PropTypes.object.isRequired,
    queryString: PropTypes.string.isRequired,
    currentPage: PropTypes.string.isRequired,
}