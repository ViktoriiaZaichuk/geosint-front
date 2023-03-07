import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ challenge, demo, createdByMe, hasPlayedByMe }) => {
    const buttonText = createdByMe || hasPlayedByMe > 0 ? "Voir" : "Jouer";
    const buttonClass = createdByMe || hasPlayedByMe > 0 ? "button card--btn created-by-me-btn" : "button card--btn";

    return (
        <div className="card">
            <div className="card--img">
                <img src={challenge.image ? `http://la-tote-server.eddi.cloud:8080/${challenge.image}` : challenge.challengeImg} alt="Challenge"/>
            </div>
            <div className="card--title">
                <span>{challenge.name}</span>
                {challenge.level === 1 ? <p>Facile</p> : challenge.level === 2 ? <p>Intermédiaire</p> : <p>Expert</p>}
            </div>
            <p className="card--txt">{challenge.description}</p>
            <button className={buttonClass}><Link to={demo ? "/login" : `/challenge/${challenge.id}`}>{buttonText}</Link></button>

            {createdByMe && 
                <div className="created-by-me">
                    <spa>Ton challenge</spa>
                </div>
            }
            {hasPlayedByMe > 0 && 
                <div className="created-by-me">
                    <spa>Déjà joué</spa>
                </div>
            }
        </div>
    )
}

export default Card