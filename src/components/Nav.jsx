import React from "react";
import { Link } from "react-router-dom";
import ForwardArrow from "../images/arrow_forward.png";
import logo from "../images/logo.png";
import "../styles/nav.css";
import logout from "../images/logout.png";
import person from "../images/person2.png";
import { signOut } from "@aws-amplify/auth";

const Nav = ({ isAuthenticated, handleSignOut }) => {
    return (
        <div className="mainNavBox">
            <div className="box1">
                <div className="address">
                    <p>33 Coral Reef Drive</p>
                    <p>Malé, Maldives</p>
                </div>
                <div className="nav1">
                    <Link to="/" className="navLinks1" id="home">HOME</Link>
                    <Link to="/room-availability" className="navLinks1" id="our-rooms">OUR ROOMS</Link>
                </div>
            </div>

            <img src={logo} alt="Logo" id="logo" />

            <div className="box2">
                <div className="phoneAndBook">
                    {isAuthenticated ? (
                        <span
                            className="navLinks3"
                            onClick={signOut}
                            style={{ cursor: 'pointer' }}
                        >
                            Sign Out
                            <img onClick={signOut} src={logout} alt="logout" className="logout" />
                        </span>
                    ) : (
                        <Link to="/account" className="navLinks3" id="signInLink">
                            Sign In/Sign Up
                            <img src={person} alt="user" className="user" />
                        </Link>
                    )}

                    <Link to="/booking" id="bookYourStay">
                        Book your stay <img src={ForwardArrow} alt="Forward Arrow" className="forwardArrow" />
                    </Link>
                </div>
                <div className="nav2">
                    <Link to="/activity-availability" className="navLinks2" id="activities">ACTIVITIES</Link>
                    <Link to="/account" className="navLinks2" id="dining">ACCOUNT</Link>
                </div>
            </div>
        </div>
    );
};

export default Nav;
