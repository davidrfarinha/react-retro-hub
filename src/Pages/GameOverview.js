import React from 'react';
import { useOutletContext } from 'react-router';

export default function GameOverview() {
    const { gameDetails } = useOutletContext();
    const gameDescription = gameDetails.description_raw;

    return (
        <div className='overview'>
            {gameDescription.length > 0 ? (<p>{gameDetails.description_raw}</p>) : (<p>No game description available!</p>)}
        </div>
    );
}