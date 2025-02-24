import React from 'react';
import { useOutletContext } from 'react-router';

export default function GameInfo() {
    const { gameDetails } = useOutletContext();
    const { genres, developers, publishers, tags } = gameDetails;
    const convertArrayToString = (array) => array?.map(item => item.name).toString().replaceAll(',', ', ');

    const gameGenres = convertArrayToString(genres);
    const gameDevelopers = convertArrayToString(developers);
    const gamePublishers = convertArrayToString(publishers);
    const gameTags = convertArrayToString(tags);
    const gamePlatforms = gameDetails?.platforms?.map(item => item.platform.name).toString().replaceAll(',', ', ');

    return (
        <div className='game-info'>
            <h4>Genres</h4>
            <p>{gameGenres}</p>
            <hr></hr>
            <h4>Developers:</h4>
            <p>{gameDevelopers}</p>
            <hr></hr>
            <h4>Publishers:</h4>
            <p>{gamePublishers}</p>
            <hr></hr>
            <h4>Platforms</h4>
            <p>{gamePlatforms}</p>
            <hr></hr>
            <h4>Tags</h4>
            <p>{gameTags}</p>
        </div>)
}