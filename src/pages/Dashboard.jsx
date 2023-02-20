import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import FooterDashboard from "../components/navigation/footer_dashboard";
import LayoutDashboard from "./LayoutDashboard";
import Card from "../components/card";
import Loader from "../components/loader";
import { getLastCreatedChallenge, getRandomChallenges } from "../api/challenge";
import { getUser, getChallengesDone } from "../api/user";
import { UserContext } from "../context/UserContext";
import { ReactComponent as Avatar1 } from "../assets/icons/avatar1.svg";
import { ReactComponent as Avatar2 } from "../assets/icons/avatar2.svg";
import { ReactComponent as Avatar3 } from "../assets/icons/avatar3.svg";
import { ReactComponent as Avatar4 } from "../assets/icons/avatar4.svg";
import { ReactComponent as Trophy } from "../assets/icons/trophy.svg";
import { ReactComponent as Compass } from "../assets/icons/compass.svg";
import { ReactComponent as StarSts } from "../assets/icons/star-stats.svg";
import { ReactComponent as Calendar } from "../assets/icons/calendar.svg";
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg'

const Dashboard = () => {
    const { user, dispatch } = useContext(UserContext)

    const { isFetching, data } = useQuery("randomChallenges", getRandomChallenges);

    const { isFetching: lastChallengeFetching, data: lastChallenge } = useQuery("lastChallenge", getLastCreatedChallenge);

    const { data: userData } = useQuery("user", getUser);

    const { data: challengesDone } = useQuery("challengesDone", getChallengesDone);

    function calculateMonthlyScore(objects, year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        
        const filteredObjects = objects.filter(obj => {
          const objDate = new Date(obj.createdAt);
          return objDate >= firstDayOfMonth && objDate.getMonth() === month;
        });
        
        const monthlyScore = filteredObjects.reduce((total, obj) => {
          return total + obj.challenge_score;
        }, 0);
        
        return monthlyScore;
    }

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    useEffect(() => {
        if (userData) {
            dispatch({ type: "GET_USER", payload: { username: userData.username, avatar: userData.avatar, global_score: userData.global_score } })
        }
    }, [dispatch, userData]);

    return (
        <LayoutDashboard className="dashboard-home">
            
            <div className="dashboard-home--profile">
                <div className="dashboard-home--profile__avatar">
                    {user.avatar === "1" && <Avatar1 />}
                    {user.avatar === "2" && <Avatar2 />}
                    {user.avatar === "3" && <Avatar3 />}
                    {user.avatar === "4" && <Avatar4 />}
                </div>
            </div>

            <div className="dashboard-home--profiletxt">
                <span>{user.username}</span>
            </div>

            <div>
                <div className="dashboard-home--stats">
                    <div className="dashboard-home--stats__data">
                        <div className="ranking">
                            <div>
                               <p>Ton classement général</p>
                               <span>{user.global_score}</span>
                            </div>
                            <div>
                                <Trophy></Trophy>
                            </div>
                        </div>
                        <div className="ranking-stats">
                            <div>
                                <div>
                                    <p>Challenges résolus</p>
                                    <span>{challengesDone?.length}</span>
                                </div>
                                <div>
                                    <Compass></Compass>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Meilleur score</p>
                                    <span>{
                                        challengesDone?.length > 0 && challengesDone.reduce((prev, current) => (prev.challenge_score > current.challenge_score) ? prev : current).challenge_score    
                                    }</span>
                                </div>
                                <div>
                                    <StarSts></StarSts>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Score mensuel</p>
                                    <span>{challengesDone?.length > 0 && calculateMonthlyScore(challengesDone, year, month)}</span>
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
                        {lastChallengeFetching ? <Loader /> : data.length > 0 && <Card key={lastChallenge.id} challenge={lastChallenge} />}
                    </div>
                </div>
                <div className="dashboard-home--challenges">
                    <h2>Notre sélection pour toi :</h2>
                    <div className="card-list">
                        {isFetching ? <Loader /> : data.length > 0 && data.map((challenge) => <Card key={challenge.id} challenge={challenge} />)}
                    </div>
                    <div className="link">
                        <Link to={""}>Voir d’autres challenges <ArrowRight className="arrow-right"></ArrowRight></Link>
                    </div>
                </div>
                <div className="dashboard-home--groupe">
                    <h2>CHALLENGE DE GROUPE :</h2>
                    <div className="card-list">
                        {isFetching ? <Loader /> : data.length > 0 && data.map((challenge) => <Card key={challenge.id} challenge={challenge} />)}
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