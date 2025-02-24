import React from "react";
import { NavLink } from "react-router-dom";
import { home, about, search, contacts } from "../assets/svgIcons";


export default function NavBar() {
    return (
        <nav className="main-navbar">
            <div className="title-wrapper">
                <h1>Retro Games Hub</h1>
            </div>
            <div className="links-wrapper">
                <NavLink
                    to="/"
                    title="Home Page"
                    className={({ isActive }) => isActive ? "navBar-link is-active" : "navBar-link"}>
                    {home}
                    <p className="navBar-linkText">Home</p>
                </NavLink>
                <NavLink
                    to="/about"
                    title="About Page"
                    className={({ isActive }) => isActive ? "navBar-link is-active" : "navBar-link"}>
                    {about}
                    <p className="navBar-linkText">About</p>
                </NavLink>
                <NavLink
                    to="/search"
                    title="Search Page"
                    className={({ isActive }) => isActive ? "navBar-link is-active" : "navBar-link"}>
                    {search}
                    <p className="navBar-linkText">Search</p>
                </NavLink>
                <NavLink
                    to="/contacts"
                    title="Contacts page"
                    className={({ isActive }) => isActive ? "navBar-link is-active" : "navBar-link"}>
                    {contacts}
                    <p className="navBar-linkText">Contacts</p>
                </NavLink>
            </div>

        </nav>
    );
}
