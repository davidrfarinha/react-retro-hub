import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';

export default function GameCard(props) {
    const { name, background_image, released, slug, genres } = props.itemData;
    const date = new Date(released);
    const yearOfRelease = date.getFullYear();
    const convertToString = (array) => array.toString().replaceAll(',', ', ');
    const genresString = convertToString(genres.map(item => item.name));
    const [searchParams] = useSearchParams();

    return (
        <Link
            to={`${slug}`}
            state={{url: `?${searchParams.toString()}`}}
            className="game-card"
            aria-label={`View details about Game Boy Game ${name}, released in ${yearOfRelease}`}>
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
    genres: PropTypes.array
}
