import React from "react";
import { useSelector } from "react-redux";
import linkedUp from "../assets/linkedup.svg"
import "../stylesheets/LandingPageNavBar.css"

const LandingPageNavBar = () => {
    return (
        <div id="landing-page-heading">

            <div id="landing-page-nav-bar-container">
                <div id="landing-page-nav-bar-main-left">
                    <img id="landing-page-nav-bar-logo" src={linkedUp}></img>
                </div>
                <div id="landing-page-nav-bar-main-right">
                    <ul id="nav-bar-right-left">
                        <li className='navbar-icons' id="repo-icon-container">
                            <a className="icon-content" href="https://github.com/kmaikat/linkedIn-clone">
                                <i id='nav-icon' className="fa-solid fa-compass"></i>
                                <div className="icon-names">
                                    Repo
                                </div>
                            </a>
                        </li>
                        <li className='navbar-icons' id="connect-icon-container">
                            <a className="icon-content" href="https://www.linkedin.com/in/kpmai20/">
                                <i id='nav-icon' className="fa-solid fa-user-group"></i>
                                <div className="icon-names">
                                    Connect
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div id="nav-bar-right-actions">
                        <a id="join-now-container" href="/sign-up">Join now</a>
                        <a id="sign-in-container" href="/login">Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPageNavBar
