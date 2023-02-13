import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileMenu from './profile_menu'
import Button from '../button'

const DashboardHeader = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);


    return (
        <header className='header-dashboard'>
            <nav className='header-dashboard--nav'>
                <div 
                    onClick={() => {setIsNavExpanded(!isNavExpanded)}}
                    className='header-dashboard--nav__btn'>
                        <span className={ isNavExpanded ? "expanded" : ""}></span>
                </div>


                <div
                className={ isNavExpanded ? "dashboard-menu-overlay expanded" : "mobile-menu-overlay"}
                >
                    <ul>
                        <li>
                            <Link to={"/challenges_list"}>Liste des challenges</Link>
                        </li>
                        <li>
                            <Link to={"/general_ranking"}>Classement général</Link>
                        </li>
                        <li>
                            <Link to={"/"}>Tes groupes</Link>
                        </li>
                        <li>
                            <Button className={'button'}><Link className='link' to={"/create_challenge"}>Créer un challenge</Link></Button>
                        </li>
                        <li>
                            <Button className={'button'}><Link className='link' to={"/"}>Créer un groupe</Link></Button>
                        </li>
                    </ul>
                </div>

            </nav>
            <ProfileMenu></ProfileMenu>
        </header>
    )
}

export default DashboardHeader;