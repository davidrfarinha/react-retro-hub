import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchGames } from "../utils/fetchData";
export default function SearchGames() {
    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = (event) => setSearchQuery(event.target.value);
    const [allResults, setAllResults] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [loadingResults, setLoadingResults] = useState(false);
    const [querySearched, setQuerySearched] = useState("");

    const handleSubmit = (event) => {
        setAllResults([]); // Resetting allResults to start over;
        event.preventDefault();
        setLoadingResults(true); // Showing Loading message
        setQuerySearched(searchQuery); //for later use and to display in results list;
        fetchGames(searchQuery, 1).then((data) => {
            setLoadingResults(false);
            if (data.results) {
                setSearchQuery(""); // Resetting searchQuery
                setAllResults([{
                    pageNumber: 1,
                    results: data
                }])
                setCurrentPage(1);
            }


        });
    };

    const handleNavigate = (event) => {
        
        const id = event.target.id;
        console.log(id)
        if (id === "previousPage") {
            console.log("previous page clicked");
            setCurrentPage(prev => prev - 1)
        } else if (id === "nextPage") {
            console.log("next page clicked");
            if (!allResults[currentPage]) {
                console.log("Fetching data")
                setLoadingResults(true);
                fetchGames(querySearched, currentPage + 1).then((data) => {
                    console.log(data.results);
                    setLoadingResults(false); // Hiding Loading message
                    if (data.results) {
                        setAllResults(prev => {
                            return [...prev, {
                                pageNumber: currentPage + 1,
                                results: data
                            }]
                        })
                        setCurrentPage(prev => prev + 1);
                    } else {
                        console.log(data);
                        console.log("No data received");
                    }
                });
            } else {
                console.log("Not fetching data")
                setCurrentPage(prev => prev + 1);
            }
        }
    }
    return (
        <Outlet context={{ searchQuery, handleChange, allResults, currentPage, loadingResults, querySearched, handleSubmit, handleNavigate }} />
    );
}



// Checking if there are already results stored in cache;
// useEffect(() => {
//     const storedResults = localStorage.getItem("storedResults");
//     if (storedResults) {
//         const parsedResults = JSON.parse(storedResults);
//         setAllResults(parsedResults);
//     }
// }, []);
