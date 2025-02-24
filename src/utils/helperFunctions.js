import { fetchAllGamesPlatforms, fetchAllGamesGenres } from "../utils/fetchData";

const convertToString = (array) => array.toString().replaceAll(',', ', ');

function createStateFilterObject(dataArray, filterType) {
    let returnObject = {};
    dataArray.forEach(item => {
        returnObject[item.slug] = {
            name: item.name,
            id: item.id,
            checked: false,
            filter: filterType,
            slug: item.slug,
        };
    });
    return returnObject;
}

const retroGamesPlatforms = ["pc", "nintendo-3ds", "nintendo-ds", "nintendo-dsi", "macos", "linux", "xbox360", "xbox-old", "playstation3", "playstation2", "playstation1", "ps-vita", "psp", "wii-u", "wii", "gamecube", "nintendo-64", "game-boy-advance", "game-boy-color", "game-boy", "snes", "nes", "macintosh", "apple-ii", "commodore-amiga", "atari-7800", "atari-5200", "atari-2600", "atari-flashback", "atari-8-bit", "atari-st", "atari-lynx", "atari-xegs", "genesis", "sega-saturn", "sega-cd", "sega-32x", "sega-master-system", "dreamcast", "3do", "jaguar", "game-gear", "neogeo"];

async function assetsLoader(gameAssets) {
    console.log("Assets loader ran! Checking if assets already available in local storage.");
    const storedGamePlatforms = localStorage.getItem("gamePlatforms");
    const storedGameGenres = localStorage.getItem("gameGenres");
    const needToLoad = (!storedGamePlatforms || !storedGameGenres);
    if (!needToLoad) {
        console.log("Assets already available in Local Storage. Returning stored data.");
        const gamePlatforms = JSON.parse(storedGamePlatforms);
        const gameGenres = JSON.parse(storedGameGenres);
        return {gamePlatforms, gameGenres};
    } else {
        console.log("Assets not yet available in Local Storage. Fetching data.");
        try {
            const initialDataFetches = [fetchAllGamesPlatforms(), fetchAllGamesGenres()];
            const responses = await Promise.all(initialDataFetches);
            console.log(responses);
            if (responses) {
                console.log("Data successfully fetched!")
                const [allGamesPlatforms, allGamesGenres] = responses;
                let gamePlatforms;
                let gameGenres;
                if (allGamesPlatforms) {
                    const arrayGamesPlatformsIncluded = allGamesPlatforms.filter(item => retroGamesPlatforms.includes(item.slug));
                    gamePlatforms = createStateFilterObject(arrayGamesPlatformsIncluded, "platform");
                    localStorage.setItem("gamePlatforms", JSON.stringify(gamePlatforms));
                }
                if (allGamesGenres) {
                    gameGenres = createStateFilterObject(allGamesGenres, "genre");
                    localStorage.setItem("gameGenres", JSON.stringify(gameGenres));
                }
                return {gamePlatforms, gameGenres};
            } else {
                throw new Error("Unable to fetch assets!");
            }
        } catch (error) {
            console.error("Error fetching assets: ", error);
        }
    }
}


export { convertToString, createStateFilterObject, assetsLoader }