import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { ThemeContext } from '../../context/ThemeContext'
import Button from '../button'
import { ReactComponent as WhiteInsta } from '../../assets/icons/insta_light.svg'
import { ReactComponent as Insta } from '../../assets/icons/insta.svg'
import { ReactComponent as Discord } from '../../assets/icons/discord.svg'
import { ReactComponent as WhiteDiscord } from '../../assets/icons/discord_light.svg'
import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg'
import { ReactComponent as WhiteTwitter } from '../../assets/icons/twitter_light.svg'
import { ReactComponent as Logo } from '../../assets/icons/logo_purple_shadow.svg'
import { ReactComponent as WhiteLogo } from '../../assets/icons/logo_white_shadow.svg'
import Switch from '../switch'

const HeaderHome = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const { theme } = useContext(ThemeContext)

    return (
        <nav className='nav'>  
            <div className={theme === "light" ? 'header' : 'header dark'}>
                <Link to={"/"}>{
                    theme === "light" ? <Logo width={150} height={47} /> : <WhiteLogo width={150} height={47} />
                }</Link>
                <div className='header--right'>
                    <ul className='header--right__links'>
                        <Switch style={{ display: "flex", marginRight: "10rem" }} />
                        <Link className='link l-txt' to={'/about'}>A propos</Link>
                        <Link className='link l-txt'>Contact</Link>
                        <Button className={theme === "light" ? 'button' : 'button-purple-light'}><Link className='link' to={"/login"}>Jouer maintenant</Link></Button>
                    </ul>
                    <div className='header--right__social'>
                        {theme === "light" ? <Insta className='icon' /> : <WhiteInsta className='icon' />}
                        {theme === "light" ? <Discord className='icon' /> : <WhiteDiscord className='icon' />}
                        {theme === "light" ? <Twitter className='icon' /> : <WhiteTwitter className='icon' />}
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
                        <Link to={"/about"}>A propos</Link>
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
