import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/icons/logo_purple_shadow.svg'
import { ReactComponent as Star } from '../../assets/icons/star.svg'
import { ReactComponent as Avatar1 } from "../../assets/icons/avatar1.svg"
import { ReactComponent as Avatar2 } from "../../assets/icons/avatar2.svg"
import { ReactComponent as Avatar3 } from "../../assets/icons/avatar3.svg"
import { ReactComponent as Avatar4 } from "../../assets/icons/avatar4.svg"
import { ReactComponent as Settings } from '../../assets/icons/settings.svg'
import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
import { ReactComponent as Sun } from '../../assets/icons/sun.svg'
import { ReactComponent as Moon } from '../../assets/icons/moon.svg'
import { ReactComponent as Logout } from '../../assets/icons/logout.svg'
import { UserContext } from '../../context/UserContext'

const ProfileMenu = () => {
    const [isProfileBarExpanded, setIsProfileBarExpanded] = useState(false);

    const { user, dispatch } = useContext(UserContext);

    const handleClickOutside = (event) => {
        if (event.target.closest('.profile-menu--btn')) return;
        setIsProfileBarExpanded(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='profile-menu'>
            <div className='profile-menu--logo'>
                <Link to={"/"}><Logo /></Link>
            </div>

            <div className='profile-menu--nav'>
                <div className='profile-menu--btn'
                onClick={() => {setIsProfileBarExpanded(!isProfileBarExpanded)}}
                >   
                    <div className='profile-menu--btn__score'>
                        <Star></Star>
                        <span>{user.global_score}</span>
                    </div>
                    <div className='profile-menu--btn__avatar'>
                        {user.avatar === "1" && <Avatar1></Avatar1>}
                        {user.avatar === "2" && <Avatar2></Avatar2>}
                        {user.avatar === "3" && <Avatar3></Avatar3>}
                        {user.avatar === "4" && <Avatar4></Avatar4>}
                    </div>
                </div>

                <div
                    className={ isProfileBarExpanded ? "profilebar-overlay expanded" : "profilebar-overlay"}
                    >   
                        <div className='avatar-expanded'>
                            <div className='profile-menu--btn__score'>
                                <Star></Star>
                                <span>{user.global_score}</span>
                            </div>
                            <div className='profile-menu--btn__avatar'>
                                {user.avatar === "1" && <Avatar1></Avatar1>}
                                {user.avatar === "2" && <Avatar2></Avatar2>}
                                {user.avatar === "3" && <Avatar3></Avatar3>}
                                {user.avatar === "4" && <Avatar4></Avatar4>}
                            </div>
                        </div>
                        <ul>
                            <li>
                                <Link to={"/profile_settings"}>
                                    <Settings></Settings>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to={"/dashboard"}>
                                    <Notification></Notification>
                                    Notifications
                                </Link>
                            </li>
                            <li>
                                <Link to={"/dashboard"}>
                                    <Sun></Sun>
                                    <Moon></Moon>
                                </Link>
                            </li>
                        </ul>
                        <div>
                            <Link onClick={() => dispatch({ type: "LOGOUT" })} to={"/"}>
                                <Logout></Logout>
                                Déconnexion
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu;