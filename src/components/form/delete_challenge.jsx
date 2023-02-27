import React, { useState } from 'react'
import Modal from 'react-modal';
import { deleteChallenge } from "../../api/challenge";
import { useNavigate } from "react-router-dom";

const DeleteChallenge = ({ challengeId }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);
    const navigate = useNavigate()
    
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  
    const handleDelete = async (data) => {
      console.log(data)
      if (typeof data === 'string') {
        console.log('geell')
      }
      const deleted = await deleteChallenge(challengeId);
      if (deleted) {
        return navigate("/challenges_list")
      } else {
        setAlreadyPlayed(true)
      }
    };

    return (
        <div className='delete-modal'>
          <button 
            onClick={openModal}
            className="button-green"
          >
            Supprimer le challenge
          </button>
          <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="modal--delete"
              contentLabel="Modal de confirmation de suppression de challenge"
          >
            <div className=''>
              <h2>Êtes-vous sûr(e) de vouloir supprimer ce challenge ?</h2>

              { alreadyPlayed ? 
                <div className='delete-error'>La suppression du challenge est impossible car il a déjà été joué.</div> : 
                (<></>)
              }
              <div>
                <button 
                  onClick={() => handleDelete(challengeId)}
                  className="button-green"
                >
                  Oui, le supprimer</button>
                <button 
                  onClick={closeModal}
                  className="button-purple"
                >
                  Annuler
                </button>
              </div>
            </div>
          </Modal>
        </div>
    )
}

export default DeleteChallenge