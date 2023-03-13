import noPP from "../../assets/no-pp.png";
const SimpleFollowerCard = ({follower}) => {
    return (
        <div>
            <div className="simple-user-card-left-container">
                <img src={follower.profile_picture || noPP}/>
                <div>
                    <div>{follower.first_name} {follower.last_name}</div>
                    <div>{follower.title}</div>
                </div>
            </div>
            <div className="simple-user-card-right-container">
                <div id="sign-out-button">Message</div>
            </div>
        </div>
    )
}

export default SimpleFollowerCard
