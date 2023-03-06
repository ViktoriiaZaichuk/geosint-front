import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import FooterDashboard from "../components/navigation/footer_dashboard";
import LayoutDashboard from "./LayoutDashboard";
import Card from "../components/card";
import { getLastCreatedChallenge, getRandomChallenges, getChallenges } from "../api/challenge";
import { getUser, getChallengesDone, getUsersRanking } from "../api/user";
import { UserContext } from "../context/UserContext";
import { ReactComponent as Avatar1 } from "../assets/icons/avatar1.svg";
import { ReactComponent as Avatar2 } from "../assets/icons/avatar2.svg";
import { ReactComponent as Avatar3 } from "../assets/icons/avatar3.svg";
import { ReactComponent as Avatar4 } from "../assets/icons/avatar4.svg";
import { ReactComponent as Trophy } from "../assets/icons/trophy.svg";
import { ReactComponent as Compass } from "../assets/icons/compass.svg";
import { ReactComponent as CompassLight } from "../assets/icons/compass_light.svg";
import { ReactComponent as StarSts } from "../assets/icons/star-stats.svg";
import { ReactComponent as StarStsLight } from "../assets/icons/star-stats-light.svg";
import { ReactComponent as Calendar } from "../assets/icons/calendar.svg";
import { ReactComponent as CalendarLight } from "../assets/icons/calendar-light.svg";
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg';
import { ReactComponent as ArrowRightWhite } from '../assets/icons/arrow-right-white.svg';
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
    const [globalPosition, setGlobalPosition] = React.useState(0);

    const { user, dispatch } = useContext(UserContext)
    const { theme } = useContext(ThemeContext)

    const { data } = useQuery("randomChallenges", getRandomChallenges);

    const { data: lastChallenge } = useQuery("lastChallenge", getLastCreatedChallenge);

    const { data: allChallenges } = useQuery("allChallenges", async () => {
        const challenges = await getChallenges();
        return challenges.slice(-3);
    });

    const { data: userData } = useQuery("user", getUser);

    const { data: challengesDone } = useQuery("challengesDone", getChallengesDone);

    const { data: usersRanking } = useQuery("usersRanking", getUsersRanking)

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
    }, [userData]);

    useEffect(() => {
        if (usersRanking) {
            const userRanking = usersRanking.find(user => user.username === userData?.username)
            // récupérer l'index de l'utilisateur dans le tableau
            const userIndex = usersRanking.indexOf(userRanking)
            // ajouter 1 pour avoir le classement
            const userRankingPosition = userIndex + 1
            setGlobalPosition(userRankingPosition)
        }
    }, [usersRanking]);

    return (
        <LayoutDashboard className="dashboard-home">
            
            <div className={theme === "light" ? "dashboard-home--profile" : "dashboard-home--profile dark"}>
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
                               <span>{globalPosition}</span>
                            </div>
                            <div>
                                {theme === "light" ? <Trophy /> : <Trophy fill="#fff" />}
                            </div>
                        </div>
                        <div className="ranking-stats">
                            <div>
                                <div>
                                    <p>Challenges résolus</p>
                                    <span>{challengesDone?.length}</span>
                                </div>
                                <div>
                                    {theme === "light" ? <Compass /> : <CompassLight />}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Score global</p>
                                    <span>{userData?.global_score}</span>
                                </div>
                                <div>
                                    {theme === "light" ? <StarSts /> : <StarStsLight />}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Score mensuel</p>
                                    <span>{challengesDone?.length > 0 ? calculateMonthlyScore(challengesDone, year, month) : 0}</span>
                                </div>
                                <div>
                                    {theme === "light" ? <Calendar /> : <CalendarLight />}
                                </div>
                            </div>
                        </div>
                        <button className={theme === "light" ? "big-button" : "big-button-green-light"}>
                            <Link to={"/create_challenge"}>Créer un challenge</Link>
                        </button>
                    </div>

                    <div className="dashboard-home--stats__challenge">
                        <p>Ton challenge quotidien est disponible :</p>
                        {lastChallenge && <Card key={lastChallenge.id} challenge={lastChallenge} />}
                    </div>
                </div>
                <div className="dashboard-home--challenges">
                    <h2>Notre sélection pour toi :</h2>
                    <div className="card-list">
                        {data?.length > 0 ? data.map((challenge) => <Card key={challenge.id} challenge={challenge} />) : allChallenges?.length > 0 ? allChallenges.map((challenge) => <Card key={challenge.id} challenge={challenge} />) : <p>Aucun challenge disponible</p>}
                    </div>
                    <div className="link">
                        <Link to={"/challenges_list"}>Voir d’autres challenges {theme === "light" ? <ArrowRight className="arrow-right" /> : <ArrowRightWhite className="arrow-right" />}</Link>
                    </div>
                </div>
                <div className="dashboard-home--groupe">
                    <h2>CHALLENGE DE GROUPE :</h2>
                    <div className="card-list">
                        {data?.length > 0 ? data.map((challenge) => <Card key={challenge.id} challenge={challenge} />) : allChallenges?.length > 0 ? allChallenges.map((challenge) => <Card key={challenge.id} challenge={challenge} />) : <p>Aucun challenge disponible</p>}
                    </div>
                    <div className="link">
                        <Link to={"/challenges_list"}>Voir d’autres challenges {theme === "light" ? <ArrowRight className="arrow-right" /> : <ArrowRightWhite className="arrow-right" />}</Link>
                    </div>
                </div>
            </div>
                
            <FooterDashboard></FooterDashboard>
           
        </LayoutDashboard>
    )
}

export default Dashboard;