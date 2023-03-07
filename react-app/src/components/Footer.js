import linkedUp from "../assets/linkedup.svg"
const Footer = () => {
    return (
        <div id="right-home-footer-outer-container">
                <div id="right-home-footer-inner-container">
                    <p className="app-home-footer">Made with</p>
                    <ul id="technology-labels">
                        <li><a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer">Python</a></li>
                        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">Javascript</a></li>
                        <li><a href="https://flask.palletsprojects.com/en/2.2.x/" target="_blank" rel="noopener noreferrer">Flask</a></li>
                        <li><a href="https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/" target="_blank" rel="noopener noreferrer">SqlAlchemy</a></li>
                        <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML</a></li>
                        <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">CSS</a></li>
                        <li><a href="https://beta.reactjs.org/" target="_blank" rel="noopener noreferrer">React</a></li>
                        <li><a href="https://redux.js.org/introduction/getting-started" target="_blank" rel="noopener noreferrer">Redux</a></li>
                        <li><a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">NPM</a></li>
                        <li><a href="https://www.postgresql.org/about/" target="_blank" rel="noopener noreferrer">PostSQL</a></li>
                    </ul>
                    <p className="app-home-footer">hosted by<a href="https://render.com/" target="_blank" rel="noopener noreferrer">Render</a></p>
                    <p className="app-home-footer"><a href="https://tinyurl.com/linkedup-surprise" target="_blank" rel="noopener noreferrer">click here for a surprise</a></p>
                    <div id="copyright-footer-container">
                        <img id="copyright-footer-logo" src={linkedUp}></img>
                        LinkedUp Corporation © 2023
                    </div>
                </div>
            </div>
    )
}

export default Footer
