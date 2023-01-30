import React from 'react'

import ChallengeImg from '../assets/img/challenge-img/in-the-sky.jpg'

const Card = () => {
    return (
        <div className="card">
            <div className="card--img">
                <img src={ChallengeImg} alt="Challenge"/>
            </div>
            <div className="card--title">
                <span>Latin place</span>
                <div>
                    Intermédiaire
                </div>
            </div>
            <p className="card--txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid...</p>
            <button className="button card--btn">Jouer</button>
        </div>
    )
}

export default Card