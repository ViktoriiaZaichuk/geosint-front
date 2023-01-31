import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from './button'
import { ReactComponent as Insta } from '../assets/icons/insta.svg'
import { ReactComponent as Discord } from '../assets/icons/discord.svg'
import { ReactComponent as Twitter } from '../assets/icons/twitter.svg'
import { ReactComponent as Logo } from '../assets/icons/logo_purple_shadow.svg'

const HeaderHome = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);


    return (
        <nav className='nav'>  
            <div className='header'>
                <Link to={"/"}><Logo /></Link>
                <div className='header--right'>
                    <ul className='header--right__links'>
<<<<<<< HEAD
                        <Link className='link' to={"/about"}>A propos</Link>
                        <Link className='link'>Contact</Link>
=======
                        <Link className='link l-txt'>A propos</Link>
                        <Link className='link l-txt'>Contact</Link>
>>>>>>> responsive-home
                        <Button className={'button'}><Link className='link'>Jouer maintenant</Link></Button>
                    </ul>
                    <div className='header--right__social'>
                        <Insta className='icon' />
                        <Discord className='icon' />
                        <Twitter className='icon' />
                    </div>
                </div>
            </div>
            
            <div className='mobile-menu-home' >
                <Logo />
                <div 
                    onClick={() => {setIsNavExpanded(!isNavExpanded)}}
                    className='mobile-menu-home--btn'>
                    <span className={ isNavExpanded ? "expanded" : ""}></span>
                </div>
            </div>

            <div
            className={ isNavExpanded ? "mobile-menu-overlay expanded" : "mobile-menu-overlay"}
            >
                <ul>
                    <li>
                        <Link to={"/"}>Accueil</Link>
                    </li>
                    <li>
                        <Link to={"/login"}>A propos</Link>
                    </li>
                    <li>
                        <Link to={"/login"}>Connection</Link>
                    </li>
                    <li>
                        <Link to={"/register"}>Inscription</Link>
                    </li>

                    <li>
                        <Button className={'button'}><Link className='link'>Jouer maintenant</Link></Button>
                    </li>
                    <div className='header--right__social'>
                        <Insta className='icon' />
                        <Discord className='icon' />
                        <Twitter className='icon' />
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderHome
