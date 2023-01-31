import React from 'react'
import HeaderHome from '../components/navigation/header_home'
import FooterHome from '../components/navigation/footer_home'

const Layout = ({ children }) => {
    return (
        <div className='main-container'>
            <HeaderHome />
            {children}
            <FooterHome />
        </div>
    )
}

export default Layout