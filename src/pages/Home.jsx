import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Layout from "./LayoutHome";
import Card from '../components/card';
import ChallengeImg from '../assets/img/tour-eiffel.jpg'
import ChallengeImg2 from '../assets/img/taj-mahal.jpg'
import { ReactComponent as Logo } from '../assets/icons/logo-purple-bckgnd.svg'
import { ReactComponent as CreateChallenge } from '../assets/img/pensil-create.svg'
import { ReactComponent as HeroImg } from '../assets/img/hero-img.svg'
import { ReactComponent as Eye } from '../assets/img/eye-home.svg'
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg'
import { ThemeContext } from '../context/ThemeContext'


const Home = () => {
    const { theme } = useContext(ThemeContext)

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <Layout> 
            <div className={theme === "light" ? "home--page" : "home--page dark"}>
                <div className="home--hero" style={{ paddingTop: !isMobile ? "10%" : 0}}>
                    <div className="home--hero__txt">
                        <h1>Tu aimes la géographie ? Tu es amateur d'OSINT ? Essaie GEO'SINT ! </h1>
                        <p> Téléchargez des photos pour créer des défis ou relevez ceux des autres et devinez où les clichés ont été pris. Passionné·e de voyage, amateur·rice de jeux d'enquête, ou simplement à la recherche d'un défi amusant entre ami·e·s, rejoignez notre communauté. Lancez-vous dans une aventure captivante où chaque photo est une invitation vers de nouveaux horizons !</p>
                        <div className="home--hero__btn">
                            <button className={theme === "light" ? "button-purple" : "button-purple-light"}>
                                <Link className='link' to={"/login"}>Connecte-toi</Link>
                            </button>
                            <button className={theme === "light" ? "button" : "button-green-light"}>
                                <Link className='link' to={"/register"}>Inscris-toi</Link>
                            </button>
                        </div>
                    </div>
                    <div className="home--hero__img">
                        <HeroImg />
                    </div>
                </div>

                <div className="home--intro">
                    <div className="home--intro__title">
                        <h2>Welcome to </h2>
                        <Logo className="logo"></Logo>
                    </div>
                    <div className="home--intro__func">
                        <div>
                            <div>
                                <h3>Crée tes challenges</h3>
                                <p className="func-p">Télécharge des photos pour créer tes propres et partage les ensuite avec tes potes.</p>
                            </div>
                            <div>
                                <h3>Participe à des challenges quotidiens</h3>
                                <p className="func-p">Connecte-toi tous les jours pour découvrir des challenges inédits et mettre à l'épreuve tes compétences d'OSINT.</p>
                            </div>
                        </div>
                        <div>
                            <Eye></Eye>
                        </div> 
                        <div>
                            <div>
                                <h3>Invite tes amis</h3>
                                <p className="func-p">Invite tes amis et échangez ensemble dans des groupes privés.</p>
                            </div>
                            <div>
                                <h3>Deviens un expert en Osint</h3>
                                <p className="func-p">Améliore ton niveau en Osint et entraîne-toi grâce à notre application. Bientôt, tu seras le boss en matière d'investigation en ligne !</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home--challenge">
                    <div className="home--challenge__img">
                        <CreateChallenge></CreateChallenge>
                    </div>
                    <div className="home--challenge__content">
                        <h2>QUELQUES EXEMPLES DE CHALLENGES...</h2>
                        <p>(On commence tranquillement 😉)</p>
                        <div className="card-list">
                            <Card challenge={{
                                    name: 'La Tour', 
                                    description: 'Dans quelle ville se trouve cette tour ?', 
                                    level: 1,
                                    challengeImg: ChallengeImg
                                }}
                                demo 
                            />
                            <Card challenge={{
                                    name: 'Le temple', 
                                    description: 'Dans quel pays se trouve ce temple ?', 
                                    level: 1,
                                    challengeImg: ChallengeImg2
                                }}
                                demo
                            />
                        </div>
                        <div className="link">
                            <Link to={"/login"}>Connecte-toi pour en découvrir plus ! <ArrowRight className="arrow-right"></ArrowRight></Link>
                        </div>
                    </div>
                </div>

                <div className="home--discord">
                    <h2>Rejoindre notre communauté sur Discord</h2>
                    <p>Rejoignez notre groupe Discord pour échanger avec d'autres utilisateurs de notre application, partager des conseils et participer à des défis amusants. 
                        Nous espérons vous y voir bientôt !</p>
                    <button className={theme === "light" ? "button" : "button-green-light"}>Rejoindre Discord</button>
                </div>
            </div>
        </Layout>
    );
};

export default Home;