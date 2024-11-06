import React from "react";
import { useState, useEffect } from "react";
import GameCard from "../Components/GameCard";
import { useOutletContext } from "react-router-dom";
import { fetchGames, fetchAllGamesPlatforms } from "../utils/fetchData";
export default function SearchGames() {
    const [searchQuery, setSearchQuery] = useState('');
    const handleChange = (event) => setSearchQuery(event.target.value);
    const [consolesChecked, setConsolesChecked] = useState({}); // Storing which platform consoles were checked in checkbox inputs
    const [loadingResults, setLoadingResults] = useState(false);
    const props = useOutletContext();
    const { allResults, handleSetAllResults, currentPage, handleSetCurrentPage, querySearched, handleSetQuerySearched } = props;

    const [retroConsoles, setRetroConsoles] = useState([]);
    // fetching a list of game platforms and filtering out modern consoles, storing the remaining retro consoles in the component's state;
    useEffect(() => {
        const storedConsoles = localStorage.getItem("retroConsoles");
        if (storedConsoles) {
            console.log("Stored consoles in cache. No need to fetch.");
            setRetroConsoles(JSON.parse(storedConsoles));
        } else {
            console.log("Consoles not stored in cache. Fetch started.");
            const newConsoles = ["pc", "playstation5", "playstation4", "xbox-one", "xbox-series-x", "nintendo-switch", "ios", "android", "macos", "linux", "wii-u", "web"];
            fetchAllGamesPlatforms().then(response => {
                if (response) {
                    const arrayRetroConsoles = response.filter(item => !newConsoles.includes(item.slug));
                    setRetroConsoles(arrayRetroConsoles);
                    localStorage.setItem("retroConsoles", JSON.stringify(arrayRetroConsoles));
                } else {
                    console.log("Fetch of platforms failed!")
                }
            })
        }
    }, []);




    useEffect(() => {
        if (retroConsoles.length > 0) {
            const platformsObject = {};
            retroConsoles.forEach(element => {
                platformsObject[element.slug] = false;
            })
            setConsolesChecked(platformsObject);
        }
    }, [retroConsoles]);


    const handleCheckboxes = (event) => {
        const { name, checked } = event.target;
        console.log(name);
        console.log(checked);
        setConsolesChecked((prev) => ({
            ...prev,
            [name]: checked
        }))
    }
    // creating an array of checkbox elements to be displayed, one for each retro console, if there are any;
    const arrayOfPlatformsCheckboxes = Object.keys(consolesChecked).length !== 0 && (retroConsoles.map(item => {
        return (
            <div key={item.id} className="individual-checkbox-container">
                <input
                    type="checkbox"
                    id={item.id}
                    name={item.slug}
                    onChange={handleCheckboxes}
                    checked={consolesChecked[item.slug]}
                />
                <label htmlFor={item.id}>{item.name}</label>
            </div>
        );
    }));

    const consolesCheckedString = () => {
        let arrayIds = [];
        let resultIdsString = "";
        for (const property in consolesChecked) {
            if (consolesChecked[property]) {
                arrayIds.push(property.toString());
            }
        }
        arrayIds.forEach(item => {
            let platformId = retroConsoles.filter(platform => platform.slug === item)[0].id;
            resultIdsString += `${platformId}, `
        })
        console.log(resultIdsString.trimEnd().slice(0, -1));
        return resultIdsString.trimEnd().slice(0, -1);
    }

    const handleSubmit = (event) => {
        handleSetAllResults([]); // Resetting allResults to start over;
        event.preventDefault();
        setLoadingResults(true); // Showing Loading message
        handleSetQuerySearched(searchQuery); //for later use and to display in results list;
        let stringIds = consolesCheckedString();
        fetchGames(searchQuery, 1, stringIds).then((data) => {
            setLoadingResults(false);// Hiding loading message
            console.log(data);
            if (data && data.results) {
                setSearchQuery(""); // Resetting searchQuery
                handleSetAllResults([{  // Updating the state in parent route component
                    pageNumber: 1,
                    results: data
                }])
                handleSetCurrentPage(1); // Changing page to 1st page, as a new form submission ocurred;
            }
        });
    };

    const handleNavigate = (event) => {
        const id = event.target.id;
        console.log(id);
        if (id === "previousPage") {
            handleSetCurrentPage(prev => prev - 1)
        } else if (id === "nextPage") {
            if (!allResults[currentPage]) { // If page was already visited, preventing new data fetch;
                setLoadingResults(true); // Showing loading message;
                let stringIds = consolesCheckedString();
                fetchGames(querySearched, currentPage + 1, stringIds).then((data) => {
                    setLoadingResults(false); // Hiding Loading message;
                    if (data && data.results) {
                        handleSetAllResults(prev => {
                            return [...prev, {
                                pageNumber: currentPage + 1,
                                results: data
                            }]
                        })
                        handleSetCurrentPage(prev => prev + 1); // Changing page;
                    } else {
                        console.log("No data received"); // Doing nothing if fetch fails;
                    }
                });
            } else {
                handleSetCurrentPage(prev => prev + 1);
            }
        }
    }

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
                        className="search-query"
                    ></input>
                    <div className="checkboxes-container">
                        {arrayOfPlatformsCheckboxes && arrayOfPlatformsCheckboxes}
                    </div>
                    <button className="retro-button">Search</button>
                </form>
                <button onClick={consolesCheckedString}>Click me</button>
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