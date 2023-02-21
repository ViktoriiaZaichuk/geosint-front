import React, { useContext } from "react";
import Layout from "./LayoutHome";
import Card from '../components/team_card';

import { ReactComponent as Search } from '../assets/img/search.svg'
import { ReactComponent as Globe } from '../assets/img/globe.svg'
import bannerImg from '../assets/img/Shovel-Knight.jpg'
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
                    <img src={bannerImg} alt="background" className="about--banner__img" />
                    <div className="about--banner__txt">
                        <h1>Rejoignez notre communauté de joueurs passionnés maintenant et relevez le défi !</h1>
                        <p>Téléchargez des photos de différents endroits à travers le monde et mettez vos connaissances géographiques à l'épreuve en devinant où elles ont été prises.</p>
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
                        <h1>GEOS'INT</h1>
                        <p>Geo'sint vous propose une expérience de jeu unique qui vous emmène à deviner où se trouvent les différents endroits du monde à partir de photos panoramiques. Les utilisateurs peuvent défier leurs amis et se mesurer à d'autres joueurs à travers des scores en ligne. Geo'sint apporte une nouvelle dimension au jeu classique de deviner où se trouve une image en utilisant des photos haute résolution et en ajoutant des fonctionnalités sociales telles que la possibilité de défier des amis et de partager vos scores sur les réseaux sociaux. Rejoignez dès maintenant la communauté de Geo'sint et découvrez de nouveaux endroits à travers le monde en jouant.</p>
                        <Search />
                    </div>
                    <div className="about--intro__content">
                        <Globe className="globe" />
                        <div className="about--intro__content__txt">
                            <h2>Le concept du jeu</h2>
                            <p>GEOS'INT est une application mobile qui vous permet de relever des défis géographiques en répondant à des questions sur des photos prises dans des endroits du monde entier. Vous pouvez jouer seul ou avec vos amis et vous pouvez même créer vos propres défis !</p>
                            <button className="button">Jouer maintenant</button>
                        </div>
                    </div>
                </div>

                <div className="about--team">
                    <h2>Notre team</h2>
                    <p>Notre équipe de développement est composée de professionnels talentueux et déterminés. Céline est notre SCRUM Master, responsable de la planification et de la coordination du développement du projet. Clément est notre Lead Développeur, chargé de diriger les développeurs pour garantir la qualité du produit final. Thomas est notre Product Owner, responsable de définir les objectifs et la vision du projet. Enfin, Viktoriia est notre référente design, travaillant en étroite collaboration avec l'équipe pour garantir que le site ait une apparence attrayante et cohérente. Ensemble, cette équipe talentueuse travaille sans relâche pour vous offrir la meilleure expérience de jeu possible.</p>
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

                <div className="home--discord">
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