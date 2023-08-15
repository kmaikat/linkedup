import React from "react";

const LikesModal = ({postLikes}) => {
    return (
        <div>
            <div className="reaction-header">
                <div>
                    <div>Reactions</div>
                    <i class="fa-solid fa-x"></i>
                </div>
                <div>
                    {Object.keys(postLikes).length}
                </div>
            </div>
            <div className="mapped-users"></div>
        </div>
    )
}

export default LikesModal
