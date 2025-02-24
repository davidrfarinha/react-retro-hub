import React, { useState, useEffect, createContext, useContext, useMemo } from "react";
const DataContext = createContext();
export default function DataContextProvider({ children }) {
    const yearOfFirstGame = 1954;
    const [retroGamesDateRange, setRetroGamesDateRange] = useState([yearOfFirstGame, 2009]);
    const [allResults, setAllResults] = useState({});

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        setRetroGamesDateRange([yearOfFirstGame, currentYear - 25]);
    }, []);

    const data = useMemo(() => {
        const handleSetAllResults = (results) => setAllResults(results);
        return { allResults, handleSetAllResults, retroGamesDateRange}
    }, [allResults, retroGamesDateRange]);
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}
export function useDataContext() {
    return useContext(DataContext);
}