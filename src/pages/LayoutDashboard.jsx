import React, { useContext } from 'react'
import DashboardHeader from '../components/navigation/dashboard_header'
import { ThemeContext } from '../context/ThemeContext'

const LayoutDashboard = ({ children }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={theme === "light" ? 'dashboard-container' : 'dashboard-container dark'}>
            <DashboardHeader />
            <div className={theme === "light" ? 'dashboard-content' : 'dashboard-content dark'}>
                {children}
            </div>
        </div>
    )
}

export default LayoutDashboard