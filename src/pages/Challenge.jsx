import React, { useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import "moment/locale/fr";
import { FixedSizeList as List } from 'react-window'

import { getChallenge } from "../api/challenge";
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
import ChallengeAnswer from "../components/form/challenge_answer";
import EditChallenge from "../components/form/edit_challenge";
import DeleteChallenge from "../components/form/delete_challenge";
import Loader from "../components/loader";
import { ThemeContext } from "../context/ThemeContext";
import { ReactComponent as Arrow } from '../assets/icons/arrow-right.svg'
import { ReactComponent as Trophy } from '../assets/icons/trophy_small.svg'

const Row = ({ user, bg, index, color }) => (
    <div className="row-small" style={{ backgroundColor: bg }}>
        <div className="row-small--number" style={{ color: color }}>
            {index + 1}
        </div>
        <div style={{ color: color }}>
            {user?.username}
        </div>
        <div style={{ color: color }}>
            {user?.challenge_score}
        </div>
        <div className="row-small--trophy">
            {index === 0 && <Trophy fill="#e8b923" />}
            {index === 1 && <Trophy fill="#c0c0c0" />}
            {index === 2 && <Trophy fill="#cd7f32" />}
        </div>
    </div>
)
 
const Challenge = () => {
    const { id } = useParams();

    const { theme } = useContext(ThemeContext)

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
                                        className="button-purple-light"
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
                                                className={theme === "light" ? "button-purple" : "button"}
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
                            <p>Nombre de personnes ayant trouvé la bonne réponse : {challenge.ranking.length}</p>
                            <span>TOP 10</span>
                            <List
                                height={300}
                                itemCount={challenge.ranking.length <= 10 ? challenge.ranking.length : 10}
                                itemSize={60}
                                width={"100%"}
                            >
                                {({ index }) => {
                                    const user = challenge.ranking[index]
                                    const bg = index % 2 ? "#3E3E3E" : "#000000"
                                    const bgLight = index % 2 ? "#f6f6f6" : "#ebebeb"
                                    const color = index % 2 ? "#CDB4FF" : "#BFFFD6"
                                    return <Row user={user} bg={theme === "light" ? bgLight : bg} index={index} color={theme === "light" ? "#3E3E3E" : color} />
                                }}
                            </List>
                        </div>
                    </div>
                </>
            )}
            <FooterDashboard />
        </LayoutDashboard>
    )
}
 
export default Challenge