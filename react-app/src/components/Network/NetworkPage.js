import NavBar from "../NavBar"
import "../../stylesheets/NetworkPage.css"
import Footer from "../Footer"
import { useSelector } from "react-redux"
import { useState } from "react"
import SimpleUserCard from "./SimpleUserCard"
import SimpleFollowerCard from "./SimpleFollowerCard"

const NetworkPage = () => {
    const followers = useSelector(state => Object.values(state.session.user.followers))
    const followings = useSelector(state => Object.values(state.session.user.following))
    const [selected, setSelected] = useState("following")

    const selectFollowing = () => {
        setSelected("following")
    }

    const selectFollowers = () => {
        setSelected("followers")
    }

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
                            {followings.length}
                        </li>
                        <li className="manage-network-links" onClick={selectFollowers}>
                            <div>
                                <i class="fa-solid fa-user"></i>
                                Followers
                            </div>
                            {followers.length}
                        </li>
                    </ul>
                    <div className="network-footer-separator"></div>
                    <Footer></Footer>
                </div>
                <div className="network-right-view">
                    {selected == "following" &&
                        <ul>
                            {followings.length > 0 && followings.map(following => {
                                return (<SimpleUserCard following={following} />)
                            })}
                        </ul>
                    }


                    {selected == "followers" &&
                        <ul>
                            {followers.length > 0 && followers.map(follower => {
                                return (<SimpleFollowerCard follower={follower} />)
                            })}
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default NetworkPage
