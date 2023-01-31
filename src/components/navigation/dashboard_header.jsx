import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileMenu from './profile_menu'

const DashboardHeader = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);


    return (
        <header>
            <nav>
                headers
            </nav>
            <ProfileMenu></ProfileMenu>
        </header>
    )
}

export default DashboardHeader;