import React from "react";
import { Link } from "react-router-dom";
import FooterDashboard from "../components/navigation/footer_dashboard";
import LayoutDashboard from "./LayoutDashboard";
import Card from "../components/card";

import { ReactComponent as Avatar4 } from "../assets/icons/avatar4.svg";
import { ReactComponent as Trophy } from "../assets/icons/trophy.svg";
import { ReactComponent as Compass } from "../assets/icons/compass.svg";
import { ReactComponent as StarSts } from "../assets/icons/star-stats.svg";
import { ReactComponent as Calendar } from "../assets/icons/calendar.svg";
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg'

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
                    <div className="dashboard-home--stats__data">
                        <div className="ranking">
                            <div>
                               <p>Ton classement général</p>
                               <span>356</span>
                            </div>
                            <div>
                                <Trophy></Trophy>
                            </div>
                        </div>
                        <div className="ranking-stats">
                            <div>
                                <div>
                                    <p>Challenges résolus</p>
                                    <span>89</span>
                                </div>
                                <div>
                                    <Compass></Compass>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Meilleur score</p>
                                    <span>15</span>
                                </div>
                                <div>
                                    <StarSts></StarSts>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Score mensuel</p>
                                    <span>78</span>
                                </div>
                                <div>
                                    <Calendar></Calendar>
                                </div>
                            </div>
                        </div>
                        <div className="create-chlng">
                            <button className="button">Créer un challenge</button>
                        </div>
                    </div>

                    <div className="dashboard-home--stats__challenge">
                        <p>Ton challenge quotidien est disponible :</p>
                        <Card></Card>
                    </div>
                </div>
                <div className="dashboard-home--challenges">
                    <h2>Notre sélection pour toi :</h2>
                    <div className="card-list">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </div>
                    <div className="link">
                        <Link to={""}>Voir d’autres challenges <ArrowRight className="arrow-right"></ArrowRight></Link>
                    </div>
                </div>
                <div className="dashboard-home--groupe">
                    <h2>CHALLENGE DE GROUPE :</h2>
                    <div className="card-list">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </div>
                    <div className="link">
                        <Link to={""}>Voir d’autres challenges <ArrowRight className="arrow-right"></ArrowRight></Link>
                    </div>
                </div>
            </div>
                
            <FooterDashboard></FooterDashboard>
           
        </LayoutDashboard>
    )
}

export default Dashboard;