import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameDetails } from "../utils.js/fetchData";

export default function GameDetail() {
    const [gameDetails, setGameDetails] = useState(null);
    const params = useParams();
    const { slug } = params;
    useEffect(() => {
        fetchGameDetails(slug).then((result) => {
            setGameDetails(result);
        });
    }, [slug]);
    if (!gameDetails) {
        return <h1>Loading...</h1>;
    }
    const { name, released, background_image, description_raw } = gameDetails;
    const date = new Date(released);
    const yearOfRelease = date.getFullYear();
    return (
        <div className="game-details">
            <h2>
                {name} - {yearOfRelease}
            </h2>
            <img
                src={background_image}
                alt="Game Thumbnail"
            ></img>
            <p>{description_raw}</p>
        </div>
    );
}
