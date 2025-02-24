const urlList = {
    games: "https://rawg-video-games-database.p.rapidapi.com/games",
    platforms: "https://rawg-video-games-database.p.rapidapi.com/platforms",
    genres: "https://rawg-video-games-database.p.rapidapi.com/genres"
}

const apiKey = process.env.REACT_APP_API_KEY;
const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": xRapidApiKey,
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    },
};

function constructApiUrl(providedUrl, extraSearchParams) {
    const url = new URL(providedUrl)
    const searchParams = new URLSearchParams({
        key: apiKey,
    });
    if (extraSearchParams) {
        for (const key in extraSearchParams) {
            searchParams.append(key, extraSearchParams[key]);
        }
    }
    url.search = searchParams;
    return url;
}

async function makeApiRequest(url) {
    const response = await fetch(url, options);
    if (response.ok) {
        const result = await response.json();
        console.log(result);
        return result;
    } else {
        throw new Error(`An error ocurred while fetching requested data: ${response.status} - ${response.statusText}`)
    }
}

function fetchGames(currentPage, searchParameters) {
    const currentParams = {
        page: currentPage,
        page_size: 40,
    }
    for (let [key, value] of Object.entries(searchParameters)) {
        if (value !== null) {
            currentParams[key] = value;
        }
    }
    console.log(currentParams);
    const completeURL = constructApiUrl(urlList.games, currentParams);
    return makeApiRequest(completeURL);
}

function fetchGameDetails(slug) {
    console.log("Fetched game details!");
    const url = `${urlList.games}/${slug}`;
    const completeUrl = constructApiUrl(url);
    return makeApiRequest(completeUrl)
}
function fetchGameScreenshots(id) {
    console.log("Fetched game screenshots!");
    const url = `${urlList.games}/${id}/screenshots`;
    const completeURL = constructApiUrl(url);
    return makeApiRequest(completeURL);
}

function fetchGamesPlatforms(pageNumber, pageSize) {
    console.log("Fetched game platforms!");
    const extraParams = {
        page_size: pageSize,
        page: pageNumber
    }
    const completeUrl = constructApiUrl(urlList.platforms, extraParams);
    return makeApiRequest(completeUrl);
}

async function fetchAllGamesGenres() {
    console.log("Fetched game genres!");
    const completeUrl = constructApiUrl(urlList.genres);
    const result = await makeApiRequest(completeUrl);
    return result?.results
}

async function fetchAllGamesPlatforms() {
    console.log("Fetched All games Platforms!!!");
    let resultsArray = [];
    const pageSize = 10;
    try {
        const firstFetch = await fetchGamesPlatforms(1, pageSize);
        if (firstFetch) {
            resultsArray = resultsArray.concat(firstFetch.results);
            const numberOfResults = firstFetch.count;
            const numberOfMissingFetches = Math.ceil((numberOfResults - pageSize) / pageSize);
            for (let i = 2; i < (2 + numberOfMissingFetches); i++) {
                const nextFetch = await fetchGamesPlatforms(i, pageSize);
                if (nextFetch) {
                    resultsArray = resultsArray.concat(nextFetch.results);
                }
            }
            return resultsArray;
        }
    } catch (error) {
        console.error(error);
    }
}

export { fetchGames, fetchGameDetails, fetchGameScreenshots, fetchGamesPlatforms, fetchAllGamesPlatforms, fetchAllGamesGenres };





// async function fetchGamesPlatformsDetails() {
//     console.log("Fetched games Platforms!!!");
//     const apiKey = process.env.REACT_APP_API_KEY;
//     const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
//     const url = new URL(`https://rawg-video-games-database.p.rapidapi.com/platforms/31`);
//     const options = {
//         method: "GET",
//         headers: {
//             "x-rapidapi-key": xRapidApiKey,
//             "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
//         },
//     };
//     const searchParams = new URLSearchParams({
//         key: apiKey
//     });
//     url.search = searchParams.toString();
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//         return result;
//     } catch (error) {
//         console.error(error);
//     }
// }

// function paramsFromFilters(filters, prevParams) {
//     const newParams = prevParams;
//     const { platforms, genres, years, ratings } = filters;
//     // Handling the platforms filter selection:
//     if (platforms.length > 0) {
//         const stringPlatformsIds = platforms.map(item => item.id).toString();
//         newParams.platforms = stringPlatformsIds;
//     }
//     // Handling the genres filter selection:
//     if (genres.length > 0) {
//         const stringGenresIds = genres.map(item => item.id).toString();
//         newParams.genres = stringGenresIds;
//     }
//     //Handling the Years filter selection:
//     const stringDates = `${years[0]}-01-01,${years[1]}-12-31`;
//     newParams.dates = stringDates;
//     // Handling the Metacritic rating filter selection:
//     if (ratings.length === 2) {
//         newParams.metacritic = ratings.toString();
//     }
//     return newParams;
// }