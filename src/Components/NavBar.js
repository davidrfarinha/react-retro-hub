import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <div className="title-wrapper">
                <h1>Game Boy Database</h1>
            </div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/searchgames">Search</Link>
            <Link to="/contacts">Contacts</Link>
        </nav>
    );
}
