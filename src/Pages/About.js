import React from "react";
import { useLoaderData } from "react-router-dom";
// import { useDataContext } from "../Components/DataContextProvider";

export default function About() {
    const assets = useLoaderData();
    console.log(assets);
    return (
        <>
            <div className="background-gradient"></div>
            <div className="about-page">
                <h2>About us</h2>
                <p>Welcome to Retro Games Hub, a web app dedicated to providing detailed information about classic retro video games.</p>
                <p>Our mission is to preserve the history and nostalgia of the retro gaming era, while also providing a valuable resource for gamers, collectors, and enthusiasts. We're passionate about gaming and committed to making Retro Games Hub the go-to destination for all things retro gaming.</p>
                <p>With our comprehensive database, you can search for your favorite childhood games, browse through our curated list of titles, and click on each game to access detailed information, including release dates, gameplay descriptions, and more.</p>
                <p>Whether you're a retro gaming enthusiast, a collector, or simply looking for a trip down memory lane, we invite you to explore Retro Games Hub and discover the rich history of the retro gaming world.</p>
                <p>Our goal is to provide a platform where gamers of all ages can come together to celebrate the classic games that shaped the industry into what it is today. We're constantly updating our database with new titles, so be sure to check back often for the latest additions.</p>
                <p>Thanks for visiting, and happy gaming</p>
            </div>
        </>

    );
}