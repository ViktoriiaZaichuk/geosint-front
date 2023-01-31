import React from 'react'

const Card = ({ name, role, img }) => {
    return (
        <div className="card">
            <div className="card--img">
                <img src={img} alt="Challenge"/>
            </div>
            <div className="card--title">
                <span>{name}</span>
            </div>
            <p className="card--txt">{role}</p>
        </div>
    )
}

export default Card