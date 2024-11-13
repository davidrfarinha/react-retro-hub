import React from 'react';
import { useOutletContext } from 'react-router';

export default function GameInfo() {
    const { gameDetails } = useOutletContext();
    const {genres, developers, publishers, tags } = gameDetails;
    const convertToString = (array) => array.toString().replaceAll(',', ', ');
    const mapOverArray = (array) => array.map(item => item.name)
    const gameGenres = convertToString(mapOverArray(genres));
    const gameDevelopers = convertToString(mapOverArray(developers));
    const gamePublishers = convertToString(mapOverArray(publishers));
    const gameTags = convertToString(mapOverArray(tags));
    const gamePlatforms = convertToString(gameDetails.platforms.map(item => item.platform.name));

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