/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import { useDataContext } from "./DataContextProvider";

function checkActiveFilters(stateObject) {
    return Object.values(stateObject).filter(item => item.checked);
}

export default function Filter({ gamePlatforms, gameGenres, filterType, handleSetActiveFilters }) {
    const { retroGamesDateRange } = useDataContext();
    // Storing which tab is the current active in Advanced Search Navigation Bar;
    const [activeSearchNav, setActiveSearchNav] = useState("searchByPlatform");
    // The four state variables below track the values chosen by the user in the Advanced Search options;
    // Storing the value of checkbox inputs for games platforms:
    const [checkedGamePlatforms, setCheckedGamePlatforms] = useState(gamePlatforms);
    // Storing the value of checkbox inputs for game genres:
    const [checkedGameGenres, setCheckedGameGenres] = useState(gameGenres);
    const [sliderDateValues, setSliderDateValues] = useState({
        minMaxSliderValues: retroGamesDateRange,
        chosenValueRange: retroGamesDateRange,
    });
    const ratingSliderRange = filterType === "search" ? [0, 100] : [0, 5];
    const [sliderRatingValues, setSliderRatingValues] = useState({
        minMaxSliderValues: ratingSliderRange,
        chosenValueRange: ratingSliderRange,
    });

    const isDateFilterActive = sliderDateValues.minMaxSliderValues[0] !== sliderDateValues.chosenValueRange[0] || sliderDateValues.minMaxSliderValues[1] !== sliderDateValues.chosenValueRange[1];
    const isRatingFilterActive = sliderRatingValues.minMaxSliderValues[0] !== sliderRatingValues.chosenValueRange[0] || sliderRatingValues.minMaxSliderValues[1] !== sliderRatingValues.chosenValueRange[1];

    const activeFilters = {
        platforms: checkActiveFilters(checkedGamePlatforms),
        genres: checkActiveFilters(checkedGameGenres),
        years: isDateFilterActive ? sliderDateValues.chosenValueRange : sliderDateValues.minMaxSliderValues,
        ratings: isRatingFilterActive ? sliderRatingValues.chosenValueRange : [],
    };
    useEffect(() => {
        handleSetActiveFilters(activeFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedGamePlatforms, checkedGameGenres, sliderDateValues, sliderRatingValues]);

    const handleActiveAdvSearchOption = event => {
        // Changes the currently opened tab in the advanced search section;
        const { id } = event.target;
        setActiveSearchNav(id);
    };
    const handleSliderChange = (value, slider) => {
        // Handles state updating for both sliders in the advanced search section: year and rating range;
        let setFunction;
        switch (slider) {
            case "dateSlider":
                setFunction = setSliderDateValues;
                break;
            case "ratingSlider":
                setFunction = setSliderRatingValues;
                break;
            // no default
        }
        setFunction(prev => ({
            ...prev,
            chosenValueRange: value,
        }));
    };

    const resetSliderValue = (type) => {
        let setFunction;
        switch (type) {
            case "years":
                setFunction = setSliderDateValues;
                break;
            case "ratings":
                setFunction = setSliderRatingValues;
                break;
            // no default
        }
        setFunction(prev => ({
            ...prev,
            chosenValueRange: prev.minMaxSliderValues,
        }));
    };

    const handleAdvSearchInputs = event => {
        // This function handles the checkboxes of the Plataform and Genre selection section in the advanced search menu. It also handles the buttons generated whenever a filter input is selected;
        const { name, checked, type } = event.target;
        const filter = event.target.getAttribute("data-filter");
        let setFunction;
        switch (filter) {
            case "platform":
                setFunction = setCheckedGamePlatforms;
                break;
            case "genre":
                setFunction = setCheckedGameGenres;
                break;
        }
        let value;
        switch (type) {
            case "checkbox":
                value = checked;
                break;
            case "button":
                value = false;
                break;
        }
        setFunction(prev => ({
            ...prev,
            [name]: { ...prev[name], checked: value },
        }));
    };

    const advSearchNavOptions = ["platform", "genre", "year", "rating"];
    const advSearchNavLinks = advSearchNavOptions.map((item, index) => {
        const itemToUpperCase = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
        const classToAdd = activeSearchNav === `searchBy${itemToUpperCase}` ? "active" : "inactive"
        return (
            <li key={`${index}-${item}`} className={`navbar-tab ${classToAdd}`}>
                <button id={`searchBy${itemToUpperCase}`} onClick={handleActiveAdvSearchOption}>
                    {item !== "rating" ? itemToUpperCase : "Metacritic Rating"}
                </button>
            </li>
        );
    });

    const createAdvancedSearchFilterButtons = (array, type) => {
        return array.map((item, index) => {
            return (
                <button
                    key={`${item.id}-${index}`}
                    className={`filter-button search-by-${type}`}
                    name={item.slug}
                    data-filter={item.filter}
                    onClick={handleAdvSearchInputs}
                >
                    {item.name}
                </button>
            );
        });
    };

    const activeFilterButtons = [
        <div key="filterPlatforms">
            {activeFilters.platforms.length !== 0 && (
                <React.Fragment>
                    <h5>Platforms:</h5>
                    <div className="button-wrapper">
                        {createAdvancedSearchFilterButtons(activeFilters.platforms, "platforms")}
                    </div>
                </React.Fragment>
            )}
        </div>,
        <div key="filterGenres">
            {activeFilters.genres.length !== 0 && (
                <React.Fragment>
                    <h5>Genres:</h5>
                    <div className="button-wrapper">
                        {createAdvancedSearchFilterButtons(activeFilters.genres, "genres")}
                    </div>
                </React.Fragment>
            )}
        </div>,
        <div key="filterYears">
            {isDateFilterActive && (
                <>
                    <h5>Years:</h5>
                    <button className="filter-button search-by-year" onClick={() => resetSliderValue("years")}>
                        From {sliderDateValues.chosenValueRange[0]} to {sliderDateValues.chosenValueRange[1]}
                    </button>
                </>
            )}
        </div>,
        <div key="filterRatings">
            {isRatingFilterActive && (
                <>
                    <h5>Metacritic Rating:</h5>
                    <button className="filter-button search-by-rating" onClick={() => resetSliderValue("ratings")}>
                        Metacritic rating: {sliderRatingValues.chosenValueRange[0]} to {sliderRatingValues.chosenValueRange[1]}
                    </button>
                </>

            )}
        </div>,
    ];
    const createCheckBoxes = (stateObject, filterArray) => {
        let arrayToMap;
        if (filterArray) {
            arrayToMap = Object.keys(stateObject).filter(key => filterArray.includes(key));
        } else {
            arrayToMap = Object.keys(stateObject);
        }
        return arrayToMap.map(key => {
            const { id, name, filter } = stateObject[key];
            return (
                <div key={`${id}-${key}`} className="individual-checkbox-container">
                    <input type="checkbox" id={id} name={key} onChange={handleAdvSearchInputs} checked={stateObject[key].checked} data-filter={filter} />
                    <label htmlFor={id}>{name}</label>
                </div>
            );
        });
    };

    const atari = ["atari-7800", "atari-5200", "atari-2600", "atari-flashback", "atari-8-bit", "atari-st", "atari-lynx", "atari-xegs"];
    const sega = ["genesis", "sega-saturn", "sega-cd", "sega-32x", "sega-master-system", "dreamcast", "game-gear"];
    const nintendo = ["nintendo-3ds", "nintendo-ds", "nintendo-dsi", "wii-u", "wii", "gamecube", "nintendo-64", "game-boy-advance", "game-boy-color", "game-boy", "snes", "nes"];
    const playstation = ["playstation3", "playstation2", "playstation1", "ps-vita", "psp"];
    const others = ["pc", "macintosh", "apple-ii", "commodore-amiga", "3do", "jaguar", "neogeo"];
    // creating an array of checkbox elements to be displayed, one for each retro console, if there are any;
    const platformsCheckboxes = Object.keys(checkedGamePlatforms).length !== 0 ? (
        <div className="checkboxes-container platforms">
            <div>
                <h4>Nintendo</h4>
                {createCheckBoxes(checkedGamePlatforms, nintendo)}
            </div>
            <div>
                <h4>Sega</h4>
                {createCheckBoxes(checkedGamePlatforms, sega)}
            </div>
            <div>
                <h4>Atari</h4>
                {createCheckBoxes(checkedGamePlatforms, atari)}
            </div>

            <div>
                <h4>Playstation</h4>
                {createCheckBoxes(checkedGamePlatforms, playstation)}
            </div>
            <div>
                <h4>Others</h4>
                {createCheckBoxes(checkedGamePlatforms, others)}
            </div>
        </div>
    ) :
        <div className="checkboxes-container platforms">
            <h3>Advanced search by platform not available</h3>
        </div>;

    const genresCheckboxes = Object.keys(checkedGameGenres).length !== 0 ? (
        <div className="checkboxes-container genres">{createCheckBoxes(checkedGameGenres)}</div>
    ) :
        <div className="checkboxes-container genres">
            <h3>Advanced search by genre not available</h3>
        </div>;

    const dateSlider = (
        <div className="advanced-search-slider">
            <Slider
                sliderValue={sliderDateValues.chosenValueRange}
                minMaxShownValues={sliderDateValues.minMaxSliderValues}
                handleSliderChange={value => handleSliderChange(value, "dateSlider")} />
        </div>

    );

    const ratingSlider = (
        <div className="advanced-search-slider">
            <Slider
                sliderValue={sliderRatingValues.chosenValueRange}
                minMaxShownValues={sliderRatingValues.minMaxSliderValues} handleSliderChange={value => handleSliderChange(value, "ratingSlider")}
            />
        </div>

    );

    let currentlyShownSearchOption;
    switch (activeSearchNav) {
        case "searchByPlatform":
            currentlyShownSearchOption = platformsCheckboxes;
            break;
        case "searchByGenre":
            currentlyShownSearchOption = genresCheckboxes;
            break;
        case "searchByYear":
            currentlyShownSearchOption = dateSlider;
            break;
        case "searchByRating":
            currentlyShownSearchOption = ratingSlider;
            break;
        default:
            currentlyShownSearchOption = platformsCheckboxes;
    }

    return (
        <div className="advanced-search">
            <h2>Advanced Search</h2>
            <div className="active-search-filters">{activeFilterButtons}</div>
            <nav className="advanced-search-navigation">
                <ul>{advSearchNavLinks}</ul>
            </nav>
            <div className="advanced-search-options">
                {currentlyShownSearchOption}
            </div>
        </div>
    );
}