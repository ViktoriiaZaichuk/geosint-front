import React, { useState } from "react"

import Card from "../components/card";
import LayoutDashboard from "../pages/LayoutDashboard"

const ChallengesList = () => {
    const [difficulty, setDifficulty] = useState(null)

    return (
        <LayoutDashboard>
            <div className="challenges-list--page">
                <h1>Liste des challenges &#9889;</h1>

                <div className="challenges-list--difficulty">
                    <h2>Difficulté : </h2>
                    <div className="challenges-list--difficulty__buttons">
                        <button className="button-purple" onClick={() => setDifficulty("easy")}>Facile</button>
                        <button className="button-green" onClick={() => setDifficulty("medium")}>Moyen</button>
                        <button className="button-purple" onClick={() => setDifficulty("hard")}>Difficile</button>
                    </div>
                </div>

                <div className="challenges-list--list">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </LayoutDashboard>
    )
}

export default ChallengesList