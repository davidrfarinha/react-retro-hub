async function fetchGames(searchQuery, page) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
    const url = new URL("https://rawg-video-games-database.p.rapidapi.com/games");
    const searchParams = new URLSearchParams({
        key: apiKey,
        search: searchQuery,
        // platforms: "26, 5",
        page: page,
        page_size: 20,
    });
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": xRapidApiKey,
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        },
    };
    url.search = searchParams;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error(response.status);
            console.error(response.statusText);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function fetchGameDetails(slug) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
    const url = new URL(`https://rawg-video-games-database.p.rapidapi.com/games/${slug}`);
    const searchParams = new URLSearchParams({
        key: apiKey,
    });
    url.search = searchParams;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": xRapidApiKey,
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        },
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }

}

async function fetchGamesPlatforms(pageNumber, pageSize) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
    const url = new URL("https://rawg-video-games-database.p.rapidapi.com/platforms");
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": xRapidApiKey,
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        },
    };
    const searchParams = new URLSearchParams({
        key: apiKey,
        page_size: pageSize,
        page: pageNumber
    });
    url.search = searchParams.toString();
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function fetchAllGamesPlatforms() {
    let resultsArray = [];
    const pageSize = 10;
    try {
        const firstFetch = await fetchGamesPlatforms(1, pageSize);
        console.log(firstFetch);
        resultsArray = resultsArray.concat(firstFetch.results);
        const numberOfResults = firstFetch.count;
        const numberOfMissingFetches = Math.ceil((numberOfResults - pageSize) / pageSize);
        for (let i = 2; i < (2 + numberOfMissingFetches); i++) {
            const nextFetch = await fetchGamesPlatforms(i, pageSize);
            resultsArray = resultsArray.concat(nextFetch.results);
        }
        return resultsArray;
    } catch (error) {
        console.error(error);
    }
}

async function fetchGamesPlatformsDetails(id) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
    const url = new URL(`https://rawg-video-games-database.p.rapidapi.com/platforms/${id}`);
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": xRapidApiKey,
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        },
    };
    const searchParams = new URLSearchParams({
        key: apiKey
    });
    url.search = searchParams.toString();
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

// async function fetchAllGamesPlatformsDetails() {
//     const arrayOfPlatforms = await fetchAllGamesPlatforms();
// }

export { fetchGames, fetchGameDetails, fetchGamesPlatforms, fetchAllGamesPlatforms, fetchGamesPlatformsDetails };
