import React from "react";
import heroGaming from "../herogaming.png";
export default function Home() {
    return (
        <>
            <div className="background-gradient"></div>
                    <div className="home-page">
            <div className="hero-wrapper">
                <img
                    src={heroGaming}
                    className="hero-image"
                    alt="Site hero"
                ></img>

                <button className="homepage-button">Press Start</button>
            </div>
            <div className="presentation-wrapper">
                <h3>Welcome to the ultimate Retro Gaming destination! </h3>
                <h3>Whether you're a nostalgic gamer or a newcomer to the world of retro gaming, we've got you covered with our comprehensive database of Retro Video Games. </h3>
                <h3>Press Start to begin searching.</h3>
            </div>
        </div>
        </>

    );
}
