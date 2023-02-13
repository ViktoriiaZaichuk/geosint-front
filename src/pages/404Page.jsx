import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as NotFoundImg } from '../assets/img/404-img.svg'

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div>
            
                <NotFoundImg />
                <p>Ah non ! Il semble que nous ayons perdu notre chemin et que la page que vous cherchez soit introuvable.</p>
                <button className="button">
                    <Link className='link' to={"/"}>Retour à la page d'accueil</Link>
                </button>
            </div>
        </div>
    )
}

export default NotFound;