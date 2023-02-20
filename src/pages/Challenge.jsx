import React from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import "moment/locale/fr";

import { getChallenge } from "../api/challenge";
<<<<<<< HEAD
import LayoutDashboard from "../pages/LayoutDashboard";
import FooterDashboard from "../components/navigation/footer_dashboard";
=======
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
>>>>>>> dev
import ChallengeAnswer from "../components/form/challenge_answer";
import EditChallenge from "../components/form/edit_challenge";
import Loader from "../components/loader";
 
const Challenge = () => {
    const { id } = useParams();

    const { data: challenge, isFetching: isChallengeFetching } = useQuery(["challenge", id], () => getChallenge(id));

<<<<<<< HEAD
    const isCreator = challenge?.isCreator;
    const creatorData = challenge?.creator; 

=======
>>>>>>> dev
    return (
        <LayoutDashboard className="challenge-page">
            {isChallengeFetching ? <Loader /> : (
                <>
                    <div className="challenge-page--infos">
                        <div className="challenge-page--infos__details">
                            <div className="auteur-data">
                                <h1>{challenge.challenge.name}</h1>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Auteur : </td> 
<<<<<<< HEAD
                                            <td>{creatorData.username}</td> 
=======
                                            <td>{challenge.creator.username}</td> 
>>>>>>> dev
                                        </tr>   
                                        <tr>
                                            <td>Niveau : </td> 
                                            <td>{
                                                challenge.challenge.level === 1 ? "Facile" :
                                                challenge.challenge.level === 2 ? "Moyen" :
                                                challenge.challenge.level === 3 ? "Expert" :
                                                "Niveau inconnu"
                                            }</td> 
                                        </tr> 
                                        <tr>
                                            <td>Date de création : </td> 
                                            <td>{moment(challenge.challenge.createdAt).locale("fr").format("dddd D MMMM YYYY à HH:mm")}</td> 
                                        </tr>
                                        <tr>
                                            <td>Type de réponse attendue : </td> 
                                            <td>{challenge.challenge.answer_example}</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="img-info">
                                <div>
                                    <img src={`http://la-tote-server.eddi.cloud:8080/${challenge.challenge.image}`} alt="Challenge"/>
                                </div>
                            </div>
                        </div>
                        <div className="challenge-page--infos__answer"> 
                            {!challenge.isCreator ? (
                                <ChallengeAnswer challengeId={challenge.challenge.id} />
                            ) : (
                                <EditChallenge />
                            )}
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
                </>
            )}
            <FooterDashboard />
        </LayoutDashboard>
    )
}

export default Challenge