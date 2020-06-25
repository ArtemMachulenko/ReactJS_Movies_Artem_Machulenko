import React from 'react';
import './UserInfo.scss';
import {CurrentUserContext} from "../../context/CurrentUserContext";

export const UserInfo = (props) => {

    return (
        <CurrentUserContext.Consumer>
            {
                value => (
                    <div className="user-info">
                        <img src={value._links.avatar.href} className="user-info-avatar rounded-circle" alt="user"/>
                        <div className="user-info-details">
                            <span>{value.first_name} </span>
                            <span>{value.last_name}</span>
                        </div>
                    </div>
                )
            }
        </CurrentUserContext.Consumer>

    );
};