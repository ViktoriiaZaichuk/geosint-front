import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import Modal from 'react-modal'

import Layout from "./LayoutHome";
import Input from "../components/form/text_input";
import { resetUserPassword } from "../api/user";
import schema from '../resolvers/resetPassword'
import { ThemeContext } from "../context/ThemeContext";

const ResetPassword = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

    const { theme } = useContext(ThemeContext)

    const { token } = useParams()

    const { 
        getValues,
        handleSubmit, 
        control, 
        formState: { errors, isValid }
    } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = async () => {
        const formData = {
            newPassword: getValues('newPassword'),
            newPassword_confirm: getValues('confirmNewPassword'),
            resetToken: token
        }

        if (isValid) {
            const updated = await resetUserPassword(formData)

            if (updated) {
                setModalIsOpen(true)
            } else {
                setErrorModalIsOpen(true)
            }
        }
    }
    
    return (
        <Layout>
            <div className={theme === "light" ? "login--page" : "login--page dark"} style={{ height: "74vh"}}>
                <form className="login--form">
                    <h2 className="profile-settings--title">Changer le mot de passe</h2>
                    <Input
                        label="Nouveau mot de passe"
                        type="password"
                        name="newPassword"
                        control={control}
                        placeholder="********"
                        error={errors.newPassword?.message}
                    />
                    <Input
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        name="confirmNewPassword"
                        control={control}
                        placeholder="********"
                        error={errors.confirmNewPassword?.message}
                    />
                    <button className={theme === "light" ? "button-purple" : "button"} onClick={handleSubmit(onSubmit)}>Enregistrer</button>
                </form>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="modal"
                overlayClassName="overlay"
                appElement={document.getElementById('root')}
            >
                <div className="modal--content">
                    <h2 className="modal--title">&#10024; Succès &#10024;</h2>
                    <p className="modal--text">Vos informations ont bien été mises à jour</p>
                    <button className="button-purple" onClick={() => setModalIsOpen(false)}>Fermer</button>
                </div>
            </Modal>
            <Modal
                isOpen={errorModalIsOpen}
                onRequestClose={() => setErrorModalIsOpen(false)}
                className="modal"
                overlayClassName="overlay"
                appElement={document.getElementById('root')}
            >
                <div className="modal--content">
                    <h2 className="modal--title">Une erreur est survenue, veuillez réessayer</h2>
                    <button className="button-purple" onClick={() => setErrorModalIsOpen(false)}>Fermer</button>
                </div>
            </Modal>
        </Layout>
    )
}

export default ResetPassword