import noPP from "../../assets/no-pp.png";
const SimpleUserCard = ({following}) => {
    console.log(following.first_name)
    return (
        <div>
            <div className="simple-user-card-left-container">
            <div id="create-post-user-info-icon">
                    <img src={following.profile_picture || noPP} />
                </div>
                <div>
                    <div>{following.first_name} {following.last_name}</div>
                    <div>{following.title}</div>
                </div>
            </div>
            <div className="simple-user-card-right-container">
                <div id="sign-out-button">Message</div>
            </div>
        </div>
    )
}

export default SimpleUserCard
