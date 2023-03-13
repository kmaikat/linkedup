import NavBar from "../NavBar"
import "../../stylesheets/NetworkPage.css"
import Footer from "../Footer"
import { useSelector } from "react-redux"
import { useState } from "react"

const NetworkPage = () => {
    const followers = useSelector(state => state.session.user.followers)
    const following = useSelector(state => state.session.user.following)
    const [selected, setSelected] = useState("")

    const selectFollowing= () => {
        setSelected("following")
    }
    const selectFollowers= () => {
        setSelected("followers")
    }

    console.log(Object.keys(followers).length)
    return (
        <div className="app-home-outer-container">
            <NavBar />
            <div className="app-network-main-container" >
                <div className="network-left-view">
                    <div className="network-left-heading">Manage my network</div>
                    <ul className="network-links">
                        <li className="manage-network-links" onClick={selectFollowing}>
                            <div>
                                <i class="fa-solid fa-user"></i>
                                Following
                            </div>
                            {Object.keys(following).length}
                        </li>
                        <li className="manage-network-links" onClick={selectFollowers}>
                            <div>
                            <i class="fa-solid fa-user"></i>
                                Followers
                            </div>
                            {Object.keys(followers).length}
                        </li>
                    </ul>
                    <div className="network-footer-separator"></div>
                    <Footer></Footer>
                </div>
                <div className="network-right-view">
                    {selected == "following" &&
                    <div>heeeeee</div>}
                    {selected == "followers" &&
                    <div>hi</div>}
                </div>
            </div>
        </div>
    )
}

export default NetworkPage
