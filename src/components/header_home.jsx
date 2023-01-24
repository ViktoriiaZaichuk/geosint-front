import React from 'react'
import { Link } from 'react-router-dom'

import Button from './button'
import { ReactComponent as Insta } from '../assets/icons/insta.svg'
import { ReactComponent as Discord } from '../assets/icons/discord.svg'
import { ReactComponent as Twitter } from '../assets/icons/twitter.svg'
import { ReactComponent as Logo } from '../assets/icons/logo_purple_shadow.svg'

const HeaderHome = () => {
    return (
        <nav className='nav'>
            <div className='header'>
                <Logo />
                <div className='header--right'>
                    <ul className='header--right__links'>
                        <Link className='link'>A propos</Link>
                        <Link className='link'>Contact</Link>
                        <Button className={'button'}><Link className='link'>Jouer maintenant</Link></Button>
                    </ul>
                    <div className='header--right__social'>
                        <Insta className='icon' />
                        <Discord className='icon' />
                        <Twitter className='icon' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderHome
