import React from "react"
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
import ChallengeAnswer from "../components/form/challenge_answer";

import ChallengeImg from '../assets/img/challenge-img/in-the-sky.jpg'

const Challenge = ( data ) => {
    data = 'hello';

    return (
        <LayoutDashboard className="challenge-page">
            <div className="challenge-page--infos">
                <div className="challenge-page--infos__details">
                    <div className="auteur-data">
                        <h1>In the sky</h1>
                        <table>
                            <tr>
                               <td>Auteur : </td> 
                               <td>John</td> 
                            </tr>   
                            <tr>
                               <td>Niveau : </td> 
                               <td>Intermédiaire</td> 
                            </tr> 
                            <tr>
                               <td>Date de création : </td> 
                               <td>13.02.2023</td> 
                            </tr>
                            <tr>
                               <td>Type de réponse attendue : </td> 
                               <td>Donnez le nom du pays (en français et sans accents) où a été prise cette photo.</td> 
                            </tr>
                        </table>
                    </div>
                    <div className="img-info">
                        <div>
                            <img src={ChallengeImg} alt="Challenge"/>
                        </div>
                    </div>
                </div>
                <div className="challenge-page--infos__answer">
                    <ChallengeAnswer></ChallengeAnswer>
                </div>
            </div>

            <div className="challenge-page--forum">
                <div className="challenge-page--forum__messages">
                    <h2>ESPACE FORUM</h2>
                    <div>
                        <span>Pseudo</span>
                        <p>Message 1</p>
                    </div>
                    <div>
                        <span>Pseudo</span>
                        <p>Message 1</p>
                    </div>
                    <div>
                        <span>Pseudo</span>
                        <p>Message 1</p>
                    </div>
                </div>
                <div className="challenge-page--forum__ranking">
                    <h2>CLASSEMENT</h2>
                    <p>Nombre de personnes ayant trouvé la bonne réponse : XXX</p>
                    <span>TOP 10</span>
                    <ol>
                        <li>John Doe</li>
                        <li>Nice guy</li>
                        <li>Great</li>
                    </ol>
                </div>
            </div>
            <FooterDashboard></FooterDashboard> 
        </LayoutDashboard>
    )
}

export default Challenge