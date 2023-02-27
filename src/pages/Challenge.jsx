import React, { useState } from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import "moment/locale/fr";

import { getChallenge } from "../api/challenge";
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
import ChallengeAnswer from "../components/form/challenge_answer";
import EditChallenge from "../components/form/edit_challenge";
import DeleteChallenge from "../components/form/delete_challenge";
import Loader from "../components/loader";

import { ReactComponent as Arrow } from '../assets/icons/arrow-right.svg'
 
const Challenge = () => {
    const { id } = useParams();

    const { data: challenge, isFetching: isChallengeFetching } = useQuery(["challenge", id], () => getChallenge(id));

    const [parentChallengeInfo, setParentChallengeInfo] = useState(null);
    const handleChallengeInfoUpdate = (challengeInfo) => {
        setParentChallengeInfo(challengeInfo);
    };

    const [showImageModal, setShowImageModal] = useState(false);

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
                                            <td>{challenge.creator.username}</td> 
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
                                        <tr>
                                            <td>Description : </td> 
                                            <td>{challenge.challenge.description}</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="img-info">
                                <div className="img-info--wrapper">
                                    <img 
                                        src={`http://la-tote-server.eddi.cloud:8080/${challenge.challenge.image_small}`} 
                                        alt="Challenge"
                                        onClick={() => setShowImageModal(true)}
                                        className="img-info--wrapper__img"
                                    />
                                </div>
                                <div className="img-info--button">
                                    <div>
                                        <p>L'image ne s'affiche pas dans son entièreté. Pour l'agrandir</p>
                                        <Arrow/>
                                    </div>
                                    <button 
                                        onClick={() => setShowImageModal(true)}
                                        className="button-purple"
                                        >
                                        Agrandir image
                                    </button>
                                </div>
                                {showImageModal && (
                                    <div className="modal-overlay-img">
                                        <div>
                                            <img
                                                src={`http://la-tote-server.eddi.cloud:8080/${challenge.challenge.image}`}
                                                alt="Challenge"
                                            />
                                            <button 
                                                onClick={() => setShowImageModal(false)}
                                                className="button-purple"
                                            >
                                                Fermer
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!challenge?.isCompleted ? (
                            <div className="challenge-page--infos__answer"> 
                                {!challenge.isCreator ? (
                                    <ChallengeAnswer challengeId={challenge.challenge.id} challengeInfoUpdateCallback={handleChallengeInfoUpdate}  />
                                ) : (
                                    <div className="challenge-crud">
                                        <EditChallenge challenge={challenge.challenge} />
                                        <DeleteChallenge challengeId={challenge.challenge.id}/>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="challenge-page--infos__completed">
                                <h3>Tu as réussi à trouver la bonne réponse !</h3>
                                {parentChallengeInfo && (
                                    <div>
                                        <p>Nombre de tentatives : {parentChallengeInfo.attempt}</p>
                                        <p>Challenge score : {parentChallengeInfo.challenge_score}</p>
                                    </div>
                                )}
                            </div>
                        )}

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

                            {challenge.ranking.length === 0 ? (
                            <p>Aucun joueur n'a encore joué ce challenge.</p>
                            ) : (
                            <ol>
                                {challenge.ranking.map((ranking) => (
                                    <li key={ranking.ranking_id}>
                                    {ranking.username} (challenge score: {ranking.challenge_score} )
                                    </li>
                                ))}
                            </ol>
                            )}
                        </div>
                    </div>
                </>
            )}
            <FooterDashboard />
        </LayoutDashboard>
    )
}
 
export default Challenge