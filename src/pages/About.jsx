import React, { useContext } from "react";
import Layout from "./LayoutHome";
import Card from '../components/team_card';

import { ReactComponent as Polaroid } from '../assets/img/about-polaroid.svg'
import { ReactComponent as Globe } from '../assets/img/globe.svg'
import { ReactComponent as Logo } from '../assets/icons/logo_purple_shadow.svg'
import { ReactComponent as WhiteLogo } from '../assets/icons/logo_white_shadow.svg'
import Celine from '../assets/img/team/Celine.png'
import Clement from '../assets/img/team/Clement.png'
import Thomas from '../assets/img/team/Thomas.png'
import Viktoriia from '../assets/img/team/Viktoriia.png'
import { ThemeContext } from '../context/ThemeContext'

const About = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <Layout>
            <div className={theme === "light" ? "about--page" : "about--page dark"}>
                <div className="about--banner">
                    {theme === "light" ? <Logo width={1000} height={500} /> : <WhiteLogo width={1000} height={500} />}
                    <div className="about--banner__txt">
                        <h1>Une communauté de geo'sinteurs passionné.e.s !</h1>
                    </div>
                    <div className="about--banner__scores">
                        <div className="score">
                            <h2>Joueurs</h2>
                            <p>+ 2 455</p>
                        </div>
                        <div className="score">
                            <h2>Challenges</h2>
                            <p>+ 785</p>
                        </div>
                        <div className="score">
                            <h2>Pays</h2>
                            <p>+ 45</p>
                        </div>
                        <div className="score">
                            <h2>Groupes</h2>
                            <p>+ 802</p>
                        </div>
                    </div>
                </div>

                <div className="about--intro">
                    <div className="about--intro__title">
                        <Polaroid />
                    </div>
                    <div className="about--intro__content">
                        <Globe className="globe" />
                        <div className="about--intro__content__txt">
                            <h2>L'OSINT kesako ?</h2>
                            <p>Salut toi ! Tu te demandes peut-être ce que c'est que l'OSINT ? Eh bien, c'est une technique de recherche qui consiste à collecter des infos disponibles librement sur internet à propos d'une personne, d'une entreprise ou même d'un lieu ! Et chez Geo'sint, on a décidé de rendre ça fun avec des challenges basés sur des photos ! Tu pourras jouer avec tes amis, tester vos compétences en OSINT et peut-être même découvrir des choses surprenantes ! Alors, prêt à relever le défi ? !</p>
                            <button className="button">Jouer maintenant</button>
                        </div>
                    </div>
                </div>

                <div className="about--team">
                    <h2>Notre team</h2>
                    <p>Chez Geo'sint, on a une équipe de choc ! On a réuni les meilleurs professionnels pour développer notre site. Tout d'abord, il y a Céline, notre SCRUM Master, qui planifie et coordonne le projet avec brio. Puis il y a Clément, notre Lead Développeur, qui dirige nos développeurs avec détermination pour que le produit final soit de qualité. Thomas, notre Product Owner, est en charge de définir la vision du projet et de fixer les objectifs à atteindre. Enfin, Viktoriia, notre référente design, collabore étroitement avec l'équipe pour que le site soit aussi beau que cool ! Ensemble, cette équipe ultra-talentueuse travaille d'arrache-pied pour vous offrir la meilleure expérience de jeu qui soit.</p>
                    <div className="about--team__cards">
                        <Card
                            name={"Céline"}
                            role={"SCRUM Master"}
                            img={Celine}
                        />
                        <Card 
                            name={"Clément"}
                            role={"Lead Dev"}
                            img={Clement}
                        />
                        <Card 
                            name={"Thomas"}
                            role={"Product Owner"}
                            img={Thomas}
                        />
                        <Card 
                            name={"Viktoriia"}
                            role={"Design"}
                            img={Viktoriia}
                        />
                    </div>    
                </div>

                <div className="about--discord">
                    <h2>Rejoindre notre communauté sur Discord</h2>
                    <p>Rejoignez notre groupe Discord pour discuter avec d'autres utilisateurs de notre application, partager des conseils et des astuces, et participer à des défis amusants. 
                        Nous espérons vous y voir bientôt !</p>
                    <button className="button-green">Rejoindre Discord</button>
                </div>
            </div>
        </Layout>
    );
}

export default About;