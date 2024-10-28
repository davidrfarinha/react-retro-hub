async function fetchGames(searchQuery) {
    console.log("Function is running!");
    console.log(searchQuery);
    const apiKey = process.env.REACT_APP_API_KEY;
    const xRapidApiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;
    console.log(apiKey);
    console.log(xRapidApiKey);
    const url = new URL("https://rawg-video-games-database.p.rapidapi.com/games");
    const searchParams = new URLSearchParams({
        key: apiKey,
        search: searchQuery,
        platforms: "26",
        page: "1",
        page_size: "10",
    });
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": xRapidApiKey,
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        },
    };
    url.search = searchParams.toString();
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
    console.log(url);
}

async function gamesPlatforms() {
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
        page_size: 50,
    });
    url.search = searchParams.toString();
    console.log(url);
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export { fetchGames, gamesPlatforms, fetchGameDetails };
