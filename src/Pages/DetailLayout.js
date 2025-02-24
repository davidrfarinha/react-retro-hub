import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { fetchGameDetails } from "../utils/fetchData";

export default function GameDetailLayout() {
    const params = useParams();
    const { slug } = params;
    const location = useLocation();
    const searchParams = location?.state?.searchParams;
    const currentGame = location?.state?.currentGame;
    const [gameDetails, setGameDetails] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!Object.keys(gameDetails).length) {
            async function fetchDetails() {
                setLoading(true);
                try {
                    const fetchedDetails = await fetchGameDetails(slug);
                    if (fetchedDetails) {
                        setGameDetails(fetchedDetails);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
            fetchDetails();
        } // eslint-disable-next-line
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    const { name, released, background_image } = gameDetails;
    const navBarLinks = ["overview", "game-info", "ratings", "screenshots"];
    const arrayOfNavBarLinks = navBarLinks.map((item, index) => {
        return (
            <NavLink
                key={item}
                to={item === "overview" ? "" : `${item}`}
                state={{ searchParams: searchParams, currentGame: currentGame }}
                className={({ isActive }) => isActive ? "opened-page" : null}
                {...(item === "overview" && { end: true })}
            >
                {item}
            </NavLink>);
    });

    return (
        <>
            <div className="background-gradient"></div>
            <div className="details-main-container">
                <div className="details-top-container">
                    <Link
                        to={`..${searchParams}`}
                        relative="path"
                        className="retro-button"
                    >
                        Back to results
                    </Link>
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
                        <Outlet context={{ gameDetails }} />
                    </div>
                </div>
            </div>
        </>
    );
}