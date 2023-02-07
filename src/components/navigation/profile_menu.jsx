import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/icons/logo_purple_shadow.svg'
import { ReactComponent as Star } from '../../assets/icons/star.svg'
import { ReactComponent as Avatar } from '../../assets/icons/avatar4.svg'
import { ReactComponent as Settings } from '../../assets/icons/settings.svg'
import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
import { ReactComponent as Sun } from '../../assets/icons/sun.svg'
import { ReactComponent as Moon } from '../../assets/icons/moon.svg'
import { ReactComponent as Logout } from '../../assets/icons/logout.svg'
import { UserContext } from '../../context/UserContext'

const ProfileMenu = () => {
    const [isProfileBarExpanded, setIsProfileBarExpanded] = useState(false);
    const navigate = useNavigate();

    const { dispatch } = useContext(UserContext);

    const handleClickOutside = (event) => {
        if (event.target.closest('.profile-menu--btn')) return;
        setIsProfileBarExpanded(false);
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        return navigate("/")
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
                        <span>546</span>
                    </div>
                    <div className='profile-menu--btn__avatar'>
                        <Avatar></Avatar>
                    </div>
                </div>

                <div
                    className={ isProfileBarExpanded ? "profilebar-overlay expanded" : "profilebar-overlay"}
                    >   
                        <div className='avatar-expanded'>
                            <div className='profile-menu--btn__score'>
                                <Star></Star>
                                <span>546</span>
                            </div>
                            <div className='profile-menu--btn__avatar'>
                                <Avatar></Avatar>
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
                            <Link onClick={logout}>
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