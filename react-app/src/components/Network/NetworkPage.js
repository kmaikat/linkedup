import NavBar from "../NavBar"
import "../../stylesheets/NetworkPage.css"
import Footer from "../Footer"

const NetworkPage = () => {

    return (
        <div className="app-home-outer-container">
            <NavBar />
            <div className="app-network-main-container" >
                <div className="network-left-view">
                    <div className="network-left-heading">Manage my network</div>
                    <ul className="network-links">
                        <li className="manage-network-links">
                            <div>
                                <i class="fa-solid fa-user"></i>
                                Following
                            </div>
                            {/* add amount here */}
                            12
                        </li>
                        <li className="manage-network-links">
                            <div>
                            <i class="fa-solid fa-user"></i>
                                Followers
                            </div>
                            {/* add amount here */}
                            12
                        </li>
                    </ul>
                    <div className="network-footer-separator"></div>
                    <Footer></Footer>
                </div>
                <div className="network-right-view">right</div>
            </div>
        </div>
    )
}

export default NetworkPage
