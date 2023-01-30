import React from 'react'
import HeaderHome from '../components/header_home'
import FooterHome from '../components/footer_home'

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