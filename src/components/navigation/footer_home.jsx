import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Button from '../button'
import { ReactComponent as Insta } from '../../assets/icons/insta_shadow_light.svg'
import { ReactComponent as Discord } from '../../assets/icons/discord_shadow_light.svg'
import { ReactComponent as Twitter } from '../../assets/icons/twitter_shadow_light.svg'
import { ReactComponent as Logo } from '../../assets/icons/logo-purple-bckgnd.svg'
import { ThemeContext } from '../../context/ThemeContext'

const FooterHome = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <footer className={theme === "light" ? 'footer' : "footer footer-dark"}>
            <div className='footer--top'>
                <div className='footer--top__left'>
                    <Logo />
                      <p>Tu aimes la géographie ? Tu es amateur d'OSINT ? Essaye GEO'SINT !</p>
                    <Button className={'button'}><Link className='link' to={"/login"}>Jouer maintenant</Link></Button>
                </div>   
                <div className='footer--top__right'>  
                    <div className='footer--links'>
                        <Link className='footer--link' to="/about"><h2>A PROPOS</h2></Link>
                        <Link className='footer--link' to="/contact"><h2>CONTACT</h2></Link>
                    </div>
                    <div className='footer--socials'>
                        <h2 className='footer--socials__title'>SUIVEZ-NOUS</h2>
                        <div className='footer--socials__icons'>
                            <Insta className='icon' />
                            <Discord className='icon' />
                            <Twitter className='icon' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer--bottom'>
                <p>© GEO'SINT 2023</p>
                <p>CGU - Mentions légales - Politique de confidentialité</p>
            </div>
        </footer>
    )
}

export default FooterHome
