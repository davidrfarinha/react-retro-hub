import React from "react";
import { useParams, Link, NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameDetails } from "../utils/fetchData";

export default function GameDetailLayout() {

    const props = useOutletContext();
    const { allResults, currentPage } = props;
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
    const { name, released, background_image } = gameDetails;
    const navBarLinks = ["overview", "game-info", "ratings", "screenshots"];
    const arrayOfNavBarLinks = navBarLinks.map((item, index) => {
        return (<NavLink key={index} to={`/searchgames/${slug}/${item}`} className={({ isActive }) => isActive ? "opened-page" : null}>{item}</NavLink>);
    }
    );

    return (
        <>
            <div className="background-gradient"></div>
            <div className="details-main-container">
                <div className="details-top-container">
                    <Link to={"/searchgames"} className="retro-button">Back to search</Link>

                    <div className="details-title">
                        <h2>{name}</h2>
                        <h3>Released in <span>{released}</span></h3>
                    </div>
                    <img
                        src={background_image}
                        alt="Game Thumbnail"
                        className="details-game-thumbnail"
                    ></img>
                </div>
                <div className="details-bottom-container">
                    <nav>
                        {arrayOfNavBarLinks}
                    </nav>
                    <div className="details-bottom-right-container">
                        <Outlet context={{ gameDetails, allResults, currentPage }} />
                    </div>

                </div>
            </div>
        </>


    );
}
// Tabs:

// Overview: Show the game's title, release date, and a brief description.
// Game Info: Display information about the game's genres, tags, and platforms.
// Ratings: Show the game's ratings and reviews.
// Screenshots: Display a gallery of screenshots from the game.
// Stores: Provide a link to purchase the game from a digital store.
// Data to display in each tab:

// Overview:
// name
// released
// description
// Game Info:
// genres
// tags
// platforms
// Ratings:
// ratings
// reviews_count
// Screenshots:
// background_image
// background_image_additional
// Stores:
// stores