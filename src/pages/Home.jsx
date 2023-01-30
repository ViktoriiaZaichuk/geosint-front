import React from "react";
import { Link } from "react-router-dom";
import Layout from "./LayoutHome";
import Card from '../components/card';

import { ReactComponent as Logo } from '../assets/icons/logo_purple_shadow.svg'
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg'
import { ReactComponent as Search } from '../assets/img/search.svg'
import { ReactComponent as Globe } from '../assets/img/globe.svg'

const Home = () => {
    return (
        <Layout> 
            <div className="home--page">
                <div className="home--hero">
                    <div className="home--hero__txt">
                        <h1>Rejoignez notre communauté de joueurs passionnés maintenant et relevez le défi !</h1>
                        <p>Téléchargez des photos de différents endroits à travers le monde et mettez vos connaissances géographiques à l'épreuve en devinant où elles ont été prises.</p>
                        <div className="home--hero__img">
                            <button className="button-purple">
                                <Link className='link' to={"/login"}>Connecte-toi</Link>
                            </button>
                            <button className="button">
                                <Link className='link' to={"/register"}>Inscris-toi</Link>
                            </button>
                        </div>
                    </div>
                    <div>
                        <Globe></Globe>
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
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div>
                                <h3>Crée ton challenge</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div>
                            <Globe></Globe>
                        </div>
                        <div>
                            <div>
                                <h3>Invite tes amis</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div>
                                <h3>Invite tes amis</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home--challenge">
                    <div className="home--challenge__img">
                        <Search></Search>
                    </div>
                    <div className="home--challenge__content">
                        <h2>Crée ton propre challenge et invite tes amis !</h2>
                        <div className="card-list">
                            <Card></Card>
                            <Card></Card>
                        </div>
                        <div className="link">
                            <Link to={"/login"}>Voir d’autres challenges <ArrowRight className="arrow-right"></ArrowRight></Link>
                        </div>
                    </div>
                </div>

                <div className="home--discord">
                    <h2>Rejoindre notre communauté sur Discord</h2>
                    <p>Rejoignez notre groupe Discord pour discuter avec d'autres utilisateurs de notre application, partager des conseils et des astuces, et participer à des défis amusants. 
                        Nous espérons vous y voir bientôt !</p>
                    <button className="button">Rejoindre Discord</button>
                </div>
            </div>
        </Layout>
    );
};

export default Home;