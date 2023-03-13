import { useSelector } from "react-redux"
import CreatePostModal from "./CreatePostsComponents/CreatePostModal"
import NavBar from "./NavBar"
import "../stylesheets/AppHome.css"
import PostCard from "./PostCard"
import AppHomeProfileShowcase from "./AppHomeProfileShowcase"
import AppHomeLinksShowcase from "./AppHomeLinksShowcase"
import AppHomeAboutShowcase from "./AppHomeAboutShowcase"


const AppHome = () => {
    const posts = useSelector(state => Object.values(state.posts));


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
                        {posts.length > 0 && posts.map((post) => {
                            return (<PostCard post={post} />)
                        }).reverse()}
                    </ul>
                </div>
                <div className="app-home-right">
                    <AppHomeAboutShowcase/>
                </div>
            </div>
        </div>
    )
}

export default AppHome
