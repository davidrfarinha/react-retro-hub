import React from 'react';
import { useLocation } from "react-router-dom";
export default function GameScreenshots() {
    const location = useLocation();
    const currentGame = location?.state?.currentGame;
    const arrayOfThumbnails = currentGame?.short_screenshots.map((item, index) => {
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