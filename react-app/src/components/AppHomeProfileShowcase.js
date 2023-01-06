import "../stylesheets/AppHomeProfileShowcase.css"
import noPP from "../assets/no-pp.png"
import { useSelector } from "react-redux"

const AppHomeProfileShowcase = () => {
    const user = useSelector(state => state.session.user)

    return (
        <div id="app-home-profile-showcase-outer-container">
            <div id="app-home-profile-showcase-inner-container">
                <div id="app-home-profile-showcase-banner-container">
                    <img src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"/>
                </div>
                <div id="app-home-profile-showcase-icon-container">
                    <img id='noPP'src={user.profile_picture || noPP}/>
                </div>
                <div id="app-home-profile-showcase-user-info-container">
                    <p id="app-home-profile-showcase-user-name">{user.first_name} {user.last_name}</p>
                    <p id="app-home-profile-showcase-user-title">{user.title}</p>
                    <p id="app-home-profile-showcase-user-bio">{user.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default AppHomeProfileShowcase
