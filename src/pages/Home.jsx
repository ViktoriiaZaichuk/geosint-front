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
import { ThemeContext } from '../context/ThemeContext'

const Home = () => {
    const { theme } = useContext(ThemeContext)

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <Layout> 
            <div className={theme === "light" ? "home--page" : "home--page dark"}>
                <div className="home--hero" style={{ paddingTop: !isMobile ? "10%" : 0}}>
                    <div className="home--hero__txt">
                        <h1>Rejoignez notre communauté de joueurs passionnés maintenant et relevez le défi !</h1>
                        <p>Téléchargez des photos de différents endroits à travers le monde et mettez vos connaissances géographiques à l'épreuve en devinant où elles ont été prises.</p>
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
                    <p>Notre application de devinettes de localisation est le défi ultime pour les amateurs de jeux et de géographie. Téléchargez des photos de différents endroits à travers le monde et mettez vos connaissances à l'épreuve.</p>
                    <div className="home--intro__func">
                        <div>
                            <div>
                                <h3>Crée ton challenge</h3>
                                <p className="func-p">Créé ton propre challenge sur l'application et partage le ensuite.</p>
                            </div>
                            <div>
                                <h3>Participe à un challenge</h3>
                                <p className="func-p">Rejoigns un défi captivant en participant à un challenge.</p>
                            </div>
                        </div>
                        <div>
                            <Eye></Eye>
                        </div> 
                        <div>
                            <div>
                                <h3>Invite tes amis</h3>
                                <p className="func-p">Invite tes amis à participer aux mêmes challenges.</p>
                            </div>
                            <div>
                                <h3>Améliore-toi sur Osint</h3>
                                <p className="func-p">Améliore ton niveau sur Osint et entraîne-toi avec notre application.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home--challenge">
                    <div className="home--challenge__img">
                        <CreateChallenge></CreateChallenge>
                    </div>
                    <div className="home--challenge__content">
                        <h2>Crée ton propre challenge et invite tes amis !</h2>
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
                    </div>
                </div>

                <div className="home--discord">
                    <h2>Rejoindre notre communauté sur Discord</h2>
                    <p>Rejoignez notre groupe Discord pour discuter avec d'autres utilisateurs de notre application, partager des conseils et des astuces, et participer à des défis amusants. 
                        Nous espérons vous y voir bientôt !</p>
                    <button className={theme === "light" ? "button" : "button-green-light"}>Rejoindre Discord</button>
                </div>
            </div>
        </Layout>
    );
};

export default Home;