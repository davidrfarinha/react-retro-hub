import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PaginatedSearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState({}); // Stores data by page number
    const [loading, setLoading] = useState(false);

    const searchTerm = searchParams.get('searchTerm') || '';
    const page = Number(searchParams.get('page')) || 1;

    // Fetch data only if it hasn't been fetched before for the current page
    useEffect(() => {
        if (data[page]) return; // Skip fetch if data for this page already exists
        setLoading(true);

        async function fetchData() {
            try {
                const response = await fetch(`https://api.example.com/items?search=${searchTerm}&page=${page}`);
                const result = await response.json();
                setData(prevData => ({ ...prevData, [page]: result })); // Cache the result by page
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchTerm, page]);

    // Function to navigate to a different page
    const handleNavigate = (newPage) => {
        setSearchParams({ searchTerm, page: newPage });
    };

    const results = data[page] || [];

    return (
        <div>
            <h1>Search Results for "{searchTerm}"</h1>
            {loading && <p>Loading...</p>}
            <ul>
                {results.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <button onClick={() => handleNavigate(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => handleNavigate(page + 1)}>Next</button>
        </div>
    );
}

export default PaginatedSearchPage;
