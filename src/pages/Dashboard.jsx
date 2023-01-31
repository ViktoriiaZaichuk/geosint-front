import React from "react";
import { Link } from "react-router-dom";
import FooterDashboard from "../components/navigation/footer_dashboard";
import LayoutDashboard from "./LayoutDashboard";

import { ReactComponent as Avatar4 } from "../assets/icons/avatar4.svg";

const Dashboard = () => {
    return (
        <LayoutDashboard className="dashboard-home">
            
            <div className="dashboard-home--profile">
                <div className="dashboard-home--profile__avatar">
                    <Avatar4></Avatar4>
                </div>
            </div>

            <div className="dashboard-home--profiletxt">
                <span>Marie</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid...</p>
            </div>

            <div>
                <div className="dashboard-home--stats">
                        stats
                </div>
                <div className="dashboard-home--challenges">
                    challenges
                </div>
                <div className="dashboard-home--groupe">
                    groupe
                </div>
            </div>
                
            <FooterDashboard></FooterDashboard>
           
        </LayoutDashboard>
    )
}

export default Dashboard;