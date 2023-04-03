import React from "react";

export default function User(props){
    return(
        <div className="single-user">
            <img src={props.userAvatar} className="user-avatar"/>
            <a href={props.userHref} className="user-link">{props.userName}</a>
        </div>
    )
}