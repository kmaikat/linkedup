import noPP from "../../assets/no-pp.png";
const SimpleFollowerCard = ({ follower }) => {

    onMessage(content) {
        if (this.selectedUser) {
          socket.emit("private message", {
            content,
            to: this.selectedUser.userID,
          });
          this.selectedUser.messages.push({
            content,
            fromSelf: true,
          });
        }
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
                <div id="sign-out-button" onClick={onMessage}>Message</div>
            </div>
        </div>
    )
}

export default SimpleFollowerCard
