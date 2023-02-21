import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/icons/logo_purple_shadow.svg'
import { ReactComponent as WhiteLogo } from '../../assets/icons/logo_white_shadow.svg'
import { ReactComponent as Star } from '../../assets/icons/star.svg'
import { ReactComponent as Avatar1 } from "../../assets/icons/avatar1.svg"
import { ReactComponent as Avatar2 } from "../../assets/icons/avatar2.svg"
import { ReactComponent as Avatar3 } from "../../assets/icons/avatar3.svg"
import { ReactComponent as Avatar4 } from "../../assets/icons/avatar4.svg"
import { ReactComponent as Settings } from '../../assets/icons/settings.svg'
import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
import { ReactComponent as Logout } from '../../assets/icons/logout.svg'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import ThemeSwitch from '../switch'

const ProfileMenu = () => {
    const [isProfileBarExpanded, setIsProfileBarExpanded] = useState(false);

    const { user, dispatch } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);

    return (
        <div className={theme === "light" ? 'profile-menu' : 'profile-menu dark'}>
            <div className='profile-menu--logo'>
                {theme === "light" ? <Link to={"/"}><Logo /></Link> : <Link to={"/"}><WhiteLogo /></Link>}
            </div>

            <div className='profile-menu--nav'>
                <div className='profile-menu--btn'>   
                    <div className='profile-menu--btn__score'>
                        <Star></Star>
                        <span>{user.global_score}</span>
                    </div>
                    <div className='profile-menu--btn__avatar' onClick={() => {setIsProfileBarExpanded(!isProfileBarExpanded)}}>
                        {user.avatar === "1" && <Avatar1></Avatar1>}
                        {user.avatar === "2" && <Avatar2></Avatar2>}
                        {user.avatar === "3" && <Avatar3></Avatar3>}
                        {user.avatar === "4" && <Avatar4></Avatar4>}
                    </div>
                </div>

                <div className={ isProfileBarExpanded ? "profilebar-overlay expanded" : "profilebar-overlay"}>   
                        <div className='avatar-expanded'>
                            <div className='profile-menu--btn__score expanded'>
                                <Star></Star>
                                <span>{user.global_score}</span>
                            </div>
                            <div className='profile-menu--btn__avatar' onClick={() => {setIsProfileBarExpanded(!isProfileBarExpanded)}}>
                                {user.avatar === "1" && <Avatar1></Avatar1>}
                                {user.avatar === "2" && <Avatar2></Avatar2>}
                                {user.avatar === "3" && <Avatar3></Avatar3>}
                                {user.avatar === "4" && <Avatar4></Avatar4>}
                            </div>
                        </div>
                        <ul className='profile-menu--list'>
                            <li className="profile-menu--list__link expanded">
                                <Link to={"/profile_settings"}>
                                    <Settings></Settings>
                                    Profile
                                </Link>
                            </li>
                            <li className="profile-menu--list__link">
                                <Link to={"/dashboard"}>
                                    <Notification></Notification>
                                    Notifications
                                </Link>
                            </li>
                            <li className="profile-menu--switch">
                                <ThemeSwitch style={{ display: "flex",  }} />
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