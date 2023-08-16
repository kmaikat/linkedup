import noPP from "../../assets/no-pp.png";
const SimpleUserCard = ({following}) => {
    return (
        <div className="simple-user">
            <div className="simple-user-card-left-container">
            <div className="simple-user-card-picture">
                    <img src={following.profile_picture || noPP} />
                </div>
                <div className="simple-user-card-information">
                    <div className="simple-user-card-information-name">{following.first_name} {following.last_name}</div>
                    <div className="simple-user-card-information-title">{following.title}</div>
                </div>
            </div>
        </div>
    )
}

export default SimpleUserCard
