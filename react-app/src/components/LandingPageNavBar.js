import React from "react";
import { useSelector } from "react-redux";

const LandingPageNavBar = () => {
    return (
        <div>
            <div id="nav-bar-left">
                LinkedUp
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
