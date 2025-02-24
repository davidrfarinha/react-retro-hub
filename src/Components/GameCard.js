import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { convertToString } from "../utils/helperFunctions";

export default function GameCard({ itemData, searchParams, currentGamesList }) {
    const { name, background_image, released, slug, genres } = itemData;
    const date = new Date(released);
    const yearOfRelease = date.getFullYear();
    const genresString = convertToString(genres.map(item => item.name));
    const currentGame = currentGamesList?.filter(item => item.slug === slug)[0];

    return (
        <Link
            to={`${slug}`}
            state={{ searchParams: searchParams, currentGame: currentGame }}
            className="game-card"
            aria-label={`View details about Retro Game ${name}, released in ${yearOfRelease}`}>
            <h2>{name} - ({yearOfRelease})</h2>
            {background_image ? (<img className="background-image" src={background_image} alt="Game Thumbnail"></img>) : (<p>No image preview available</p>)}
            <p>{yearOfRelease} {genresString && `- ${genresString}`}</p>
        </Link>
    );
}

GameCard.propTypes = {
    itemData: PropTypes.object,
    name: PropTypes.string,
    background_image: PropTypes.string,
    released: PropTypes.string,
    slug: PropTypes.string,
    genres: PropTypes.array,
    searchParams: PropTypes.string,
    currentGamesList: PropTypes.array
}
