import React from "react";
import heroGaming from "../herogaming.png";
export default function Home() {
    return (
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
                <p>Welcome to the ultimate Game Boy retro gaming destination! </p>
                <p>Whether you're a nostalgic gamer or a newcomer to the world of retro gaming, we've got you covered with our comprehensive database of Game Boy games. </p>
                <p>Just don't press Start!</p>
            </div>
        </div>
    );
}
