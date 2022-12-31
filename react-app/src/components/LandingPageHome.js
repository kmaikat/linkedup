import React from "react";
import "../stylesheets/LandingPageHome.css"
import manSitting from "../assets/man-sitting.svg"
import LoginForm from "./auth/LoginForm";

const LandingPageHome = () => {
    return (
        <div id="landing-page-container">
            <div id="landing-page-app-container">
                <div id="landing-page-section-one">
                    <div id="section-one-left-container">
                        <div id="landing-subtitle">Welcome to your professional community</div>
                        <LoginForm />
                    </div>
                    <div id="section-one-right-container">
                        <img id="man-sitting" src={manSitting} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPageHome
