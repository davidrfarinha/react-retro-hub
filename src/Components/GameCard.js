import React from "react";
import { Link } from "react-router-dom";

export default function GameCard(props) {
    const { name, background_image, released, slug } = props.itemData;
    const date = new Date(released);
    const yearOfRelease = date.getFullYear();
    return (
        <Link
            to={`/searchgames/${slug}`}
            className="game-card"
            aria-label={`View details about Game Boy Game ${name}, released in ${yearOfRelease}`}
        >
            <h2>
                {name} - ({yearOfRelease})
            </h2>
            {background_image ? (
                <img
                    className="background-image"
                    src={background_image}
                    alt="Game Thumbnail"
                ></img>
            ) : (
                <p>No image preview available</p>
            )}
        </Link>
    );
}
