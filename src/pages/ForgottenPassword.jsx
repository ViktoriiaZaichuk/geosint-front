import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

import Layout from "./LayoutHome";
import Input from "../components/form/text_input";
import { ThemeContext } from "../context/ThemeContext";
import { forgotPassword } from "../api/user";

const ForgottenPassword = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { theme } = useContext(ThemeContext)

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    
    const { 
        control,
        handleSubmit, 
        formState: { errors, isValid } 
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
                email: yup.string().email("L'adresse email n'est pas valide").required("L'adresse email est obligatoire")
            })
        )
    });

    const onSubmit = async (data) => {
        if (isValid) {
            const posted = await forgotPassword(data.email)
            posted && toggleModal()
        }
    }

    return (
        <Layout>
            <div className={theme === "light" ? "login--page" : "login--page dark"} style={{ height: "74vh"}}>
                <div className="forgotten-password--header">
                    <a href={"/forgotten_password"}>Réinitialiser le mot de passe <div className="forgotten-password--header__underline" /></a>
                </div>
                <form className="login--form">
                    <p>Renseigne l'adresse email associée à ton <br/> compte afin de recevoir les instructions pour <br/> changer de mot de passe.</p>
                    <Input 
                        control={control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        error={errors.email?.message}
                    />
                    <button onClick={handleSubmit(onSubmit)} className={theme === "light" ? "button-purple" : "button"}>Envoyer</button>
                    <div className="login--form__register">
                        <p>Tu as déjà un compte ?</p>
                        <Link to={"/login"}>Connecte-toi</Link>
                    </div>
                </form>
            </div>
            <ReactModal
                isOpen={isModalOpen}
                className="modal"
                overlayClassName="overlay"
                onRequestClose={toggleModal}
                shouldCloseOnOverlayClick={true}
                appElement={document.getElementById("root")}
            >
                <div className="modal--content">
                    <h2 className="modal--title">&#10024; Succès &#10024;</h2>
                    <p className="modal--text">Un email de réinitialisation a été envoyé ! &#128236;</p>
                    <Link to={"/login"} className="button-purple" onClick={toggleModal}>Fermer</Link>
                </div>
            </ReactModal>
        </Layout>
    );
};

export default ForgottenPassword;