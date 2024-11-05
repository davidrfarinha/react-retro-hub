import React from 'react';
import { useParams, useOutletContext } from "react-router-dom";
export default function GameScreenshots() {
    const param = useParams();
    const location = param.slug;
    console.log(location);
    const props = useOutletContext();


    const { allResults, currentPage } = props;
    const currentResultsPage = allResults?.[currentPage - 1]?.results?.results;
    console.log(currentPage);

    const currentGame = currentResultsPage?.filter(item => item.slug === location);
    console.log(currentGame);
    // const storedResults = localStorage.getItem("storedResults");
    // let parsedResults = storedResults && JSON.parse(storedResults).results;
    // const currentPageResult = parsedResults?.filter(item => item.slug === location);
    const arrayOfThumbnails = currentGame?.[0].short_screenshots.map((item, index) => {
        if (index !== 0) {
            return (
                <img
                    key={item.id}
                    src={item.image}
                    className='screenshot'
                    alt='Game Screenshot'></img>
            );
        }
        return null;

    });

    return (
        <>
            {arrayOfThumbnails ? (
                <ul className='screenshots-container'>
                    {arrayOfThumbnails}
                </ul>
            ) : (<h3>No screenshots available</h3>)}
        </>

    );
}