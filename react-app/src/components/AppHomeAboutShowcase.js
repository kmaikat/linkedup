import "../stylesheets/AppHomeAboutShowcase.css"

import Footer from "./Footer";
const AppHomeAboutShowcase = () => {
    return (
        <div id="app-home-about-showcase">
            <div id="right-home-about-container">
                <p>About Linkedup</p>
                <p className="about-title">LinkedUp is a clone of LinkedIn where users can network professionally. Feel free to look around.</p>
                <p >Features</p>
                <ul className="about-title">
                    <li>Posts</li>
                    <p>Create a post about your insight, read others ideas, edit your post, and delete posts</p>
                    <li>Comments</li>
                    <p>Comment on posts, read each others input, update your comments, and delete your comments</p>
                </ul>
                {/* <p>Coming Soon</p>
                <ul>
                    <li>Connections</li>
                    <li>User Profile</li>
                </ul> */}
            </div>
            {/* this is the footer */}
            <Footer/>
        </div>
    )
}

export default AppHomeAboutShowcase;
