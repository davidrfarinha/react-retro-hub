import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
export default function SearchGames() {
    /* State variables allResults, currentPage, and querySearched are initialized in this component to preserve search results when the user navigates back and forth. This is necessary because this component serves as a parent route, allowing child routes to inherit its state. */
    const [allResults, setAllResults] = useState([]);
    const handleSetAllResults = (results) => setAllResults(results);
    const [currentPage, setCurrentPage] = useState();
    const handleSetCurrentPage = (page) => setCurrentPage(page);
    const [querySearched, setQuerySearched] = useState("");
    const handleSetQuerySearched = (query) => setQuerySearched(query);

    return (
        <Outlet context={{ allResults, handleSetAllResults, currentPage, handleSetCurrentPage, querySearched, handleSetQuerySearched }} />
    );
}