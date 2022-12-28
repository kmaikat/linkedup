import React from "react";
import { useSelector } from "react-redux";
import linkedUp from "../assets/linkedup.svg"
import "../stylesheets/LandingPageNavBar.css"

const LandingPageNavBar = () => {
    return (
        <div id="landing-page-nav-bar-container">
            <div id="landing-page-nav-bar-main-left">
                <img id="landing-page-nav-bar-logo" src={linkedUp}></img>
            </div>
            <div id="landing-page-nav-bar-main-right">
                <div id="nav-bar-right-left">
                    <div id="repo-icon-container">
                        <div id="repo-icon-content">
                            <i class="fa-solid fa-compass"></i>
                            <div>
                                Repo
                            </div>
                        </div>
                    </div>
                    <div id="connect-icon-container">
                        <div id="connect-icon-content">
                            <i class="fa-solid fa-user-group"></i>
                            <div>
                                Connect
                            </div>
                        </div>
                    </div>
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
