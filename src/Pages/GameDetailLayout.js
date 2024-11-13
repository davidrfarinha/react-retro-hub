import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink, Outlet, useOutletContext, useLocation } from "react-router-dom";
import { fetchGameDetails } from "../utils/fetchData";
import PropTypes from 'prop-types';

export default function GameDetailLayout() {
    const props = useOutletContext();
    const { allResults } = props;
    const [gameDetails, setGameDetails] = useState(null);
    const params = useParams();
    const { slug } = params;
    const location = useLocation();
    const previousSearch = location.state?.url || "";
    const searchParameters = new URLSearchParams(previousSearch);
    const currentPage = searchParameters.get("page");

    useEffect(() => {
        fetchGameDetails(slug).then((result) => {
            console.log(result);
            if (result) {
                setGameDetails(result);
            }
        });
    }, [slug]);

    if (!gameDetails) {
        return <h1>Loading...</h1>;
    }
    const { name, released, background_image } = gameDetails;
    const navBarLinks = ["overview", "game-info", "ratings", "screenshots"];
    const arrayOfNavBarLinks = navBarLinks.map((item, index) => {
        return (
            <NavLink
                key={item}
                to={item !== "overview" ? `${item}` : ""}
                className={({ isActive }) => isActive ? "opened-page" : null}
                state={{ url: previousSearch }}
                {...(item === "overview" && {end: true})}
            >
                {item}
            </NavLink>);
    }
    );

    return (
        <>
            <div className="background-gradient"></div>
            <div className="details-main-container">
                <div className="details-top-container">
                    <Link to={`..${previousSearch}`} className="retro-button">Back to search</Link>
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

GameDetailLayout.propTypes = {
    allResults: PropTypes.object,
}