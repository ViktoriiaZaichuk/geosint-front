import React from 'react'
import { Link } from 'react-router-dom'

import ChallengeImg from '../assets/img/challenge-img/in-the-sky.jpg'

const Card = ({ challenge }) => {
    return (
        <div className="card">
            <div className="card--img">
                <img src={challenge.image ? `http://la-tote-server.eddi.cloud:8080/${challenge.image}` : ChallengeImg} alt="Challenge"/>
            </div>
            <div className="card--title">
                <span>{challenge.name}</span>
                {challenge.level === 1 ? <p>Facile</p> : challenge.level === 2 ? <p>Intermédiaire</p> : <p>Expert</p>}
            </div>
            <p className="card--txt">{challenge.description}</p>
            <button className="button card--btn"><Link to={`/challenge/${challenge.id}`}>Jouer</Link></button>
        </div>
    )
}

export default Card