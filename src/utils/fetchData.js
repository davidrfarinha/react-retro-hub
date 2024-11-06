async function fetchGames(searchQuery, page, platforms) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
    const url = new URL("https://rawg-video-games-database.p.rapidapi.com/games");
    const searchParams = new URLSearchParams({
        key: apiKey,
        search: searchQuery,
        page: page,
        page_size: 20,
    });
    if (platforms) {
        searchParams.set("platforms", platforms);
    }
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
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(response.status);
            console.error(response.statusText);
        }
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
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(response.status);
            console.error(response.statusText);
        }

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
        console.log(response);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(response.status);
            console.error(response.statusText);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchAllGamesPlatforms() {
    console.log("Fetching platforms!")
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
