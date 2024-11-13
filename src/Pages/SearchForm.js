import React, { useState, useEffect } from "react";
import ResultsAndFilters from "../Components/ResultsAndFilters"
import { useOutletContext, useSearchParams } from "react-router-dom";
import { fetchGames, fetchAllGamesPlatforms, fetchVideoGamesGenres } from "../utils/fetchData";
// const allPlatforms = ["pc", "playstation5", "playstation4", "xbox-one", "xbox-series-x", "nintendo-switch", "ios", "android", "nintendo-3ds", "nintendo-ds", "nintendo-dsi", "macos", "linux", "xbox360", "xbox-old", "playstation3", "playstation2", "playstation1", "ps-vita", "psp", "wii-u", "wii", "gamecube", "nintendo-64", "game-boy-advance", "game-boy-color", "game-boy", "snes", "nes", "macintosh", "apple-ii", "commodore-amiga", "atari-7800", "atari-5200", "atari-2600", "atari-flashback", "atari-8-bit", "atari-st", "atari-lynx", "atari-xegs", "genesis", "sega-saturn", "sega-cd", "sega-32x", "sega-master-system", "dreamcast", "3do", "jaguar", "game-gear", "neogeo", "web"];
export default function SearchGames() {
    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeSearchQuery = (event) => setSearchQuery(event.target.value);
    const [checkedGamesPlatforms, setCheckedGamesPlatforms] = useState({}); // Storing in state the value of checkbox inputs;
    const [allGameGenres, setAllGameGenres] = useState([]); // Storing in state all game genres fetched from API to further allow filtering by genre;
    const prop = useOutletContext();
    const { allResults, handleSetAllResults } = prop;
    const [loading, setLoading] = useState({ assets: false, results: false });
    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.get("search");
    const currentPage = searchParams.get("page");
    const platforms = searchParams.get("platforms");
    const convertToString = (array) => array.toString().replaceAll(',', ', ');

    useEffect(() => {
        // Loading game assets from API;
        const storedGamesPlatforms = localStorage.getItem("checkedGamesPlatforms");
        const storedGamesGenres = localStorage.getItem("allGamesGenres");
        if (storedGamesPlatforms && storedGamesGenres) {
            setCheckedGamesPlatforms(JSON.parse(storedGamesPlatforms));
            setAllGameGenres(JSON.parse(storedGamesGenres));
        } else {
            setLoading(prev => ({ ...prev, assets: true }));
            async function loadGameAssets() {
                //fetching a list of game platforms and filtering out modern Games Platforms, storing the remaining retro Retro Games Platforms in the component's state;
                const gamesPlatformsToInclude = ["xbox-old", "playstation1", "gamecube", "nintendo-64", "game-boy-advance", "game-boy-color", "game-boy", "snes", "nes", "commodore-amiga", "atari-7800", "atari-5200", "atari-2600", "atari-flashback", "atari-8-bit", "atari-st", "atari-lynx", "atari-xegs", "genesis", "sega-saturn", "sega-cd", "sega-32x", "sega-master-system", "dreamcast", "jaguar", "game-gear", "neogeo"];
                try {
                    const initialDataFetches = [fetchAllGamesPlatforms(), fetchVideoGamesGenres()];
                    const responses = await Promise.all(initialDataFetches);
                    const allGamesPlatforms = responses[0];
                    const allGamesGenres = responses[1];
                    if (allGamesPlatforms) {
                        const arrayGamesPlatformsIncluded = allGamesPlatforms.filter(item => gamesPlatformsToInclude.includes(item.slug));
                        let stateObjectGamesPlatformsChecked = {};
                        arrayGamesPlatformsIncluded.forEach(item => {
                            stateObjectGamesPlatformsChecked[item.slug] = {
                                "gamePlatform": item,
                                id: item.id,
                                checked: false
                            }
                        })
                        setCheckedGamesPlatforms(stateObjectGamesPlatformsChecked);
                        localStorage.setItem("checkedGamesPlatforms", JSON.stringify(stateObjectGamesPlatformsChecked));
                    }
                    if (allGamesGenres) {
                        setAllGameGenres(allGamesGenres);
                        localStorage.setItem("allGamesGenres", JSON.stringify(allGamesGenres));
                    }
                } catch (error) {
                    console.error("Error fetching assets: ", error);
                } finally {
                    setLoading(prev => ({ ...prev, assets: false }));
                }
            }
            loadGameAssets();
        }
    }, []);

    useEffect(() => {
        // Load game data from API
        if (!allResults[currentPage]) {
            async function fetchSearchResults() {
                setLoading(prev => ({ ...prev, results: true }));
                try {
                    const fetchedGames = await fetchGames(queryString, currentPage, platforms);
                    if (fetchedGames.results) {
                        handleSetAllResults(prevResults => ({
                            ...prevResults,
                            [currentPage]: fetchedGames
                        }))
                    }
                } catch (error) {
                    console.error("Error fetching results!")
                } finally {
                    setLoading(prev => ({ ...prev, results: false }));
                }
            }
            if (queryString || currentPage || platforms) {
                fetchSearchResults();
            }
        }
        // eslint-disable-next-line
    }, [queryString, currentPage, platforms]);

    // Creating a list of results from state variable allResults based on value of currentPage;
    const gamesList = allResults[currentPage]?.results;



    const handlePlatformsCheckboxes = (event) => {
        const { name, checked } = event.target;
        setCheckedGamesPlatforms((prev) => ({
            ...prev,
            [name]: { ...prev[name], checked: checked }
        }))
    }

    const generateCheckedPlatformsString = () => {
        // Checking if any platforms are checked;
        if (Object.entries(checkedGamesPlatforms).some(([key, value]) => value.checked)) {
            // Filtering out checked platforms and extracting their IDs;
            const filteredArrayPlatformsChecked = Object.entries(checkedGamesPlatforms).filter(([key, value]) => {
                return value.checked;
            });
            const arrayPlatformIds = filteredArrayPlatformsChecked.map(item => item[1].id);
            return convertToString(arrayPlatformIds);
        } else {
            // If no platforms are checked, return all IDs;
            const arrayPlatformIds = Object.entries(checkedGamesPlatforms).map(([key, value]) => value.id);
            return convertToString(arrayPlatformIds);
        }
    }

    const handleSubmit = (event) => {
        handleSetAllResults({}); // Resetting allResults to start over;
        event.preventDefault();
        let stringIds = generateCheckedPlatformsString();
        setSearchParams({ search: searchQuery, page: 1, platforms: stringIds });
        setSearchQuery("");
    };

    // creating an array of checkbox elements to be displayed, one for each retro console, if there are any;
    const platformsCheckboxes = Object.keys(checkedGamesPlatforms).length !== 0 && (
        <>
            <h3>Choose your platforms</h3>
            <div className="checkboxes-container">
                {Object.keys(checkedGamesPlatforms).map(key => {
                    const { id, slug, name } = checkedGamesPlatforms[key].gamePlatform;
                    return (<div key={id} className="individual-checkbox-container">
                        <input
                            type="checkbox"
                            id={id}
                            name={slug}
                            onChange={handlePlatformsCheckboxes}
                            checked={checkedGamesPlatforms[key].checked}
                        />
                        <label htmlFor={id}>{name}</label>
                    </div>)
                })}
            </div>
        </>
    );

    console.log("---------------------------------------------------------------")
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
                        onChange={handleChangeSearchQuery}
                        placeholder="Type your search..."
                        className="search-query"
                    ></input>
                    {loading.assets ?
                        <h3>Loading...</h3> :
                        platformsCheckboxes && <>{platformsCheckboxes}</>
                    }
                    <button className="retro-button">Search</button>
                </form>
                {/* <button onClick={fetchVideoGamesGenres}>Click me</button> */}
                {loading.results ? (<div>Loading...</div>) :
                    (gamesList && (
                        <ResultsAndFilters
                            allGameGenres={allGameGenres}
                            gamesList={gamesList}
                            queryString={queryString}
                            currentPage={currentPage}
                            allResults={allResults}
                        />
                    ))
                }
            </div>
        </>
    );
}