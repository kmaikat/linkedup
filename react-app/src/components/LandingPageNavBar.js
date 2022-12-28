import React from "react";
import { useSelector } from "react-redux";
import linkedUp from "../assets/linkedup.svg"
import "../stylesheets/LandingPageNavBar.css"

const LandingPageNavBar = () => {
    return (
        <div>
            <div id="nav-bar-left">
                <img id="landing-page-nav-bar-logo" src={linkedUp}></img>
            </div>
            <div id="nav-bar-right">
                <div id="nav-bar-right-left">
                    <i class="fa-brands fa-github"></i>
                </div>
                <div id="nav-bar-right-right">
                    <div id="join-now-container">Join now</div>
                    <div id="sign-in-container">Sign in</div>
                </div>
            </div>
        </div>
    )
}

export default LandingPageNavBar
