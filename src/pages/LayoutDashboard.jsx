import React from 'react'
import DashboardHeader from '../components/navigation/dashboard_header'

const LayoutDashboard = ({ children }) => {
    return (
        <div className='dashboard-container'>
            <DashboardHeader />
            <div className='dashboard-content'>
                {children}
            </div>
        </div>
    )
}

export default LayoutDashboard