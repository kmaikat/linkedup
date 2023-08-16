import noPP from "../../assets/no-pp.png";
import '../../stylesheets/SimpleUserCard.css'
const SimpleFollowerCard = ({ follower }) => {
    return (
        <div className="simple-user">
            <div className="simple-user-card-left-container">
                <div className="simple-user-card-picture">
                    <img src={follower.profile_picture || noPP} />
                </div>
                <div className="simple-user-card-information">
                    <div className="simple-user-card-information-name">{follower.first_name} {follower.last_name}</div>
                    <div className="simple-user-card-information-title">{follower.title}</div>
                </div>
            </div>
            <div className="simple-user-card-right-container">
                {/* <div id="sign-out-button">Message</div> */}
            </div>
        </div>
    )
}

export default SimpleFollowerCard
