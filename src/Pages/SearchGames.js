import React, { useState } from "react";
import { Outlet } from "react-router-dom";
export default function SearchGames() {
    /* State variables allResults, currentPage, and querySearched are initialized in this component to preserve search results when the user navigates back and forth. This is necessary because this component serves as a parent route, allowing child routes to inherit its state. */
    console.log("Component search Games rendered.");
    const [allResults, setAllResults] = useState({});
    const handleSetAllResults = (results) => setAllResults(results);

    return (
        <Outlet context={{ allResults, handleSetAllResults }} />
    );
}