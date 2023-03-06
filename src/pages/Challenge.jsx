import React, { useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import "moment/locale/fr";
import { FixedSizeList as List } from 'react-window';

import { getChallenge } from "../api/challenge";
import LayoutDashboard from "../pages/LayoutDashboard";
import FooterDashboard from "../components/navigation/footer_dashboard";
import ChallengeAnswer from "../components/form/challenge_answer";
import EditChallenge from "../components/form/edit_challenge";
import DeleteChallenge from "../components/form/delete_challenge";
import { ThemeContext } from "../context/ThemeContext";
import { ReactComponent as Arrow } from '../assets/icons/arrow-right.svg';
import { ReactComponent as Trophy } from '../assets/icons/trophy_small.svg';
import Chat from "../components/chat";
import ScrollToTop from "../components/scrollToTop";
 
const Challenge = () => {
    const { id } = useParams();

    const { theme } = useContext(ThemeContext)

    const { data: challenge } = useQuery(["challenge", id], () => getChallenge(id));

    const [parentChallengeInfo, setParentChallengeInfo] = useState(null);

    const Row = ({ index, style }) => {
        const bg = index % 2 ? "#3E3E3E" : "#000000"
        const bgLight = index % 2 ? "#f6f6f6" : "#ebebeb"
        const color = index % 2 ? "#CDB4FF" : "#BFFFD6"
    
        return (
            <div className="row-small" style={{...style, backgroundColor: theme === "light" ? bgLight : bg, color: theme === "light" ? "#3E3E3E" : color, fontSize: "1.5rem" }}>
                <div className="row-small--number">
                    {index + 1}
                </div>
                <div>
                    {challenge?.ranking[index].username}
                </div>
                <div>
                    {challenge?.ranking[index].challenge_score}
                </div>
                <div className="row--trophy">
                    {index === 0 && <Trophy fill="#e8b923" />}
                    {index === 1 && <Trophy fill="#c0c0c0" />}
                    {index === 2 && <Trophy fill="#cd7f32" />}
                </div>
            </div>
        )
    }

    const handleChallengeInfoUpdate = (challengeInfo) => {
        setParentChallengeInfo(challengeInfo);
    };

    const [showImageModal, setShowImageModal] = useState(false);

    return (
        <LayoutDashboard className="challenge-page">
            <ScrollToTop>
                <div className="challenge-page--infos">
                    <div className="challenge-page--infos__details">
                        <div className="auteur-data">
                            <h1>{challenge?.challenge.name}</h1>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Auteur : </td> 
                                        <td>{challenge?.creator.username}</td> 
                                    </tr>   
                                    <tr>
                                        <td>Niveau : </td> 
                                        <td>{
                                            challenge?.challenge.level === 1 ? "Facile" :
                                            challenge?.challenge.level === 2 ? "Moyen" :
                                            challenge?.challenge.level === 3 ? "Expert" :
                                            "Niveau inconnu"
                                        }</td> 
                                    </tr> 
                                    <tr>
                                        <td>Date de création : </td> 
                                        <td>{moment(challenge?.challenge.createdAt).locale("fr").format("dddd D MMMM YYYY à HH:mm")}</td> 
                                    </tr>
                                    <tr>
                                        <td>Type de réponse attendue : </td> 
                                        <td>{challenge?.challenge.answer_example}</td> 
                                    </tr>
                                    <tr>
                                        <td>Description : </td> 
                                        <td>{challenge?.challenge.description}</td> 
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="img-info">
                            <div className="img-info--wrapper">
                                <img 
                                    src={`http://la-tote-server.eddi.cloud:8080/${challenge?.challenge.image_small}`} 
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
                                            src={`http://la-tote-server.eddi.cloud:8080/${challenge?.challenge.image}`}
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
                            {!challenge?.isCreator ? (
                                <ChallengeAnswer challengeId={challenge?.challenge.id} challengeInfoUpdateCallback={handleChallengeInfoUpdate}  />
                            ) : (
                                <div className="challenge-crud">
                                    <EditChallenge challenge={challenge?.challenge} />
                                    <DeleteChallenge challengeId={challenge?.challenge.id}/>
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
                    <Chat challengeId={id} />
                    <div className="challenge-page--forum__ranking">
                        <h2>CLASSEMENT</h2>
                        <p>Nombre de personnes ayant trouvé la bonne réponse : {challenge?.ranking.length}</p>
                        <span>TOP 10</span>
                        <List
                            height={300}
                            itemCount={challenge?.ranking.length <= 10 ? challenge?.ranking.length : 10}
                            itemSize={35}
                            width={"100%"}
                        >
                            {Row}
                        </List>
                    </div>
                </div>
            </ScrollToTop>
            <FooterDashboard />
        </LayoutDashboard>
    )
}
 
export default Challenge