import React from "react";

const UserCircle = (props) => {
        return (
            <img alt="User avatar" src={props.pictureUrl} className="user-circle"/>
        );
};

export default UserCircle;
