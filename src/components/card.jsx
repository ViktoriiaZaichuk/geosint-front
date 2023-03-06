import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ challenge, demo }) => {
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
            <button className="button card--btn"><Link to={demo ? "/login" : `/challenge/${challenge.id}`}>Jouer</Link></button>
        </div>
    )
}

export default Card