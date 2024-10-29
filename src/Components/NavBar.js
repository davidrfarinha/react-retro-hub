import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { home, about, search, contacts } from "../assets/svgIcons";


export default function NavBar() {
    const params = useParams();
    console.log(params);
    return (
        <nav>
            <div className="title-wrapper">
                <h1>Game Boy Database</h1>
            </div>
            <div className="links-wrapper">
            <Link
                to="/"
                title="Home Page"
            >
                {home}
                <p className="navBar-linkText">Home</p>
            </Link>
            <Link
                to="/about"
                title="About Page"
            >
                {about}
                <p className="navBar-linkText">About</p>
            </Link>
            <Link
                to="/searchgames"
                title="Search Page"
            >
                {search}
                <p className="navBar-linkText">Search</p>
            </Link>
            <Link
                to="/contacts"
                title="Contacts page"
            >
                {contacts}
                <p className="navBar-linkText">Contacts</p>
            </Link>



            </div>

        </nav>
    );
}
