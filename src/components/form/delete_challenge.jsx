import React, { useState } from 'react'
import Modal from 'react-modal';
import { deleteChallenge } from "../../api/challenge";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

const DeleteChallenge = ({ challengeId }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);
    
    const navigate = useNavigate();
  
    const handleDelete = async (data) => {

      const deleted = await deleteChallenge(challengeId);

      if (deleted) {
        setShowSuccessModal(true);
        modalIsOpen(false);
      } else {
        setAlreadyPlayed(true)
      }
    };

    return (
        <div className='delete-modal'>
          <button 
            onClick={() => setIsOpen(true)}
            className="button-green"
          >
            Supprimer le challenge
          </button>
          <Modal
              isOpen={modalIsOpen}
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
                  onClick={() => setIsOpen(false)}
                  className="button-purple"
                >
                  Annuler
                </button>
              </div>
            </div>
          </Modal>

          <ReactModal
                isOpen={showSuccessModal}
                onRequestClose={() => setShowSuccessModal(false)}
                className="modal"
                overlayClassName="overlay"
                appElement={document.getElementById("root")}
            >
                <div className="modal--content">
                    <h2 className="modal--title">Le challenge a été supprimé avec succès</h2>
                    <button onClick={() => navigate("/challenges_list")} type="button" className="button-purple">Fermer</button>
                </div>
          </ReactModal>
        </div>
    )
}

export default DeleteChallenge