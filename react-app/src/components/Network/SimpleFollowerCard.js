import noPP from "../../assets/no-pp.png";
const SimpleFollowerCard = ({ follower }) => {
    const createRoom = () => {
        console.log("make a room")
    }
    return (
        <div>
            <div className="simple-user-card-left-container">
                <div id="create-post-user-info-icon">
                    <img src={follower.profile_picture || noPP} />
                </div>
                <div>
                    <div>{follower.first_name} {follower.last_name}</div>
                    <div>{follower.title}</div>
                </div>
            </div>
            <div className="simple-user-card-right-container">
                <div id="sign-out-button" onClick={createRoom}>Message</div>
            </div>
        </div>
    )
}

export default SimpleFollowerCard
