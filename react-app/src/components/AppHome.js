import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CreatePostModal from "./CreatePostsComponents/CreatePostModal"
import NavBar from "./NavBar"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import "../stylesheets/AppHome.css"
import { deletePostThunk, editPostThunk } from "../store/posts"
import PostCard from "./PostCard"
import AppHomeProfileShowcase from "./AppHomeProfileShowcase"
import AppHomeLinksShowcase from "./AppHomeLinksShowcase"


const AppHome = () => {
    const posts = useSelector(state => Object.values(state.posts));
    const dispatch = useDispatch()


    // const handleEditToggle = async (post) => {
    //     const errors = dispatch(editPostThunk(post))
    // }

    return (
        <div className="app-home-outer-container">
            <NavBar />
            <div className="app-home-main-container" >
                <div className="app-home-profile-section">
                    <AppHomeProfileShowcase/>
                    <AppHomeLinksShowcase/>
                </div>
                <div className="app-home-feed">
                    <CreatePostModal />
                    <ul>
                        {console.log(posts)}
                        {posts.length > 0 && posts.map((post) => {
                            return (<PostCard post={post} />)
                        }).reverse()}
                    </ul>
                </div>
                <div className="app-home-right">
                </div>
            </div>
        </div>
    )
}

export default AppHome
