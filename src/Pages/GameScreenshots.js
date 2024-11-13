import React from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import PropTypes from 'prop-types';
export default function GameScreenshots() {
    const param = useParams();
    const location = param.slug;
    const props = useOutletContext();
    const { allResults, currentPage } = props;
    const currentResultsPage = allResults?.[currentPage]?.results;
    const currentGame = currentResultsPage?.filter(item => item.slug === location);
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
GameScreenshots.propTypes = {
    allResults: PropTypes.object,
    currentPage: PropTypes.string,
}