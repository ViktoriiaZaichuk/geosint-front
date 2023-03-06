import React, { useState } from "react"
import { useMediaQuery } from 'react-responsive'
import Modal from 'react-modal'
import { useQuery } from "react-query"

import Card from "../components/card"
import LayoutDashboard from "../pages/LayoutDashboard"
import { getChallenges } from "../api/challenge"
import Loader from "../components/loader"

const ChallengesList = () => {
    const [difficulty, setDifficulty] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    const { isFetching, data } = useQuery("challenges", getChallenges)
    
    return (
        <LayoutDashboard>
            <div className="challenges-list--page">
                <h1>Liste des challenges &#9889;</h1>

                {isMobile ? (
                    <div className="challenges-list--difficulty">
                        <button className="button-purple mobile" onClick={toggleModal}>Trier par difficulté</button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={toggleModal}
                            className="modal"
                            overlayClassName="overlay"
                            appElement={document.getElementById('root')}
                        >
                            <div className="modal--content">
                                <div className="modal--content__difficulty">
                                    <button className={difficulty === 1 ? "button-green" : "button-purple"} onClick={() => {
                                        setDifficulty(1)
                                        toggleModal()
                                    }}>Facile</button>
                                    <button className={difficulty === 2 ? "button-green" : "button-purple"} onClick={() => {
                                        setDifficulty(2)
                                        toggleModal()
                                    }}>Intermédiaire</button>
                                    <button className={difficulty === 3 ? "button-green" : "button-purple"} onClick={() => {
                                        setDifficulty(3)
                                        toggleModal()
                                    }}>Expert</button>
                                    <button className={difficulty === 0 ? "button-green" : "button-purple"} onClick={() => {
                                        setDifficulty(0)
                                        toggleModal()
                                    }}>Tous</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                ) : (
                    <div className="challenges-list--difficulty">
                        <h2>Difficulté : </h2>
                        <div className="challenges-list--difficulty__buttons">
                            <button className={difficulty === 1 ? "button-green" : "button-purple"} onClick={() => setDifficulty(1)}>Facile</button>
                            <button className={difficulty === 2 ? "button-green" : "button-purple"} onClick={() => setDifficulty(2)}>Intermédiaire</button>
                            <button className={difficulty === 3 ? "button-green" : "button-purple"} onClick={() => setDifficulty(3)}>Expert</button>
                            <button className={difficulty === 0 ? "button-green" : "button-purple"} onClick={() => setDifficulty(0)}>Tous</button>
                        </div>
                    </div>
                )}

                <div className="challenges-list--list">
                    <div>
                    {isFetching ? <Loader /> : data && (
                        data.map((challenge) => {
                            if (difficulty === 0) {
                                return <Card key={challenge.id} challenge={challenge} />
                            } else if (difficulty === challenge.level) {
                                return <Card key={challenge.id} challenge={challenge} />
                            }
                        })
                    )}
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    )
}

export default ChallengesList