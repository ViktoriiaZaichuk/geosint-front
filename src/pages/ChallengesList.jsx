import React, { useState } from "react"
import { useMediaQuery } from 'react-responsive'
import Modal from 'react-modal'

import Card from "../components/card"
import LayoutDashboard from "../pages/LayoutDashboard"

const ChallengesList = () => {
    const [difficulty, setDifficulty] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <LayoutDashboard>
            <div className="challenges-list--page">
                <h1>Liste des challenges &#9889;</h1>

                {isMobile ? (
                    <div className="challenges-list--difficulty">
                        <button className="button-purple mobile" onClick={openModal}>Trier par difficulté</button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            className="modal"
                            overlayClassName="overlay"
                            appElement={document.getElementById('root')}
                        >
                            <div className="modal--content">
                                <div className="modal--content__difficulty">
                                    <button className="button-gray" onClick={() => {
                                        setDifficulty("easy")
                                        closeModal()
                                    }}>Facile</button>
                                    <button className="button-green" onClick={() => {
                                        setDifficulty("medium")
                                        closeModal()
                                    }}>Intermédiaire</button>
                                    <button className="button-purple" onClick={() => {
                                        setDifficulty("hard")
                                        closeModal()
                                    }}>Expert</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                ) : (
                    <div className="challenges-list--difficulty">
                        <h2>Difficulté : </h2>
                        <div className="challenges-list--difficulty__buttons">
                            <button className="button-purple" onClick={() => setDifficulty("easy")}>Facile</button>
                            <button className="button-green" onClick={() => setDifficulty("medium")}>Intermédiaire</button>
                            <button className="button-purple" onClick={() => setDifficulty("hard")}>Expert</button>
                        </div>
                    </div>
                )}

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