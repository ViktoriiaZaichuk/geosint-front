import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { yupResolver } from '@hookform/resolvers/yup'

import Layout from "./LayoutHome";
import Input from "../components/form/text_input";
import { registerUser } from "../api/auth";
import schema from "../resolvers/register"
import { ReactComponent as Avatar1 } from "../assets/icons/avatar1.svg";
import { ReactComponent as Avatar2 } from "../assets/icons/avatar2.svg";
import { ReactComponent as Avatar3 } from "../assets/icons/avatar3.svg";
import { ReactComponent as Avatar4 } from "../assets/icons/avatar4.svg";

const Register = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate()

    const { 
        getValues,
        control,
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const avatarValue = getValues("avatar")
        const usernameValue = getValues("username")
        const emailValue = getValues("email")

        const isRegister = await registerUser(data)

        if (isRegister) {
            setModalIsOpen(true)
        }

        reset({ avatar: avatarValue, username: usernameValue, email: emailValue, password: "" })
    }
    
    return (
        <Layout>
            <div className="login--page">
                <div className="login--header">
                    <Link to={"/login"}>Connexion</Link>
                    <div>
                        <Link to={"/register"}>Inscription</Link>
                        <div className="login--header__underline" />
                    </div>
                </div>
                <form className="login--form">
                    <div className="login--form__input">
                        <label htmlFor="avatar">Choisis ton avatar</label>
                        <Controller
                            name="avatar"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <ul className="login--form__avatar">
                                    <li className={value === 1 ? "active" : ""}>
                                        <Avatar1 onClick={() => onChange(1)} />
                                    </li>
                                    <li className={value === 2 ? "active" : ""}>
                                        <Avatar2 onClick={() => onChange(2)} />
                                    </li>
                                    <li className={value === 3 ? "active" : ""}>
                                        <Avatar3 onClick={() => onChange(3)} />
                                    </li>
                                    <li className={value === 4 ? "active" : ""}>
                                        <Avatar4 onClick={() => onChange(4)} />
                                    </li>
                                </ul>
                            )}
                        />
                        {errors.avatar?.message && <p className="error">{errors.avatar?.message}</p>}
                    </div>
                    <Input 
                        control={control}
                        name="username"
                        type="text"
                        label="Pseudo"
                        placeholder="tony"
                        error={errors.username?.message}
                    />
                    <Input
                        control={control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder=""
                        error={errors.email?.message}
                    />
                    <Input
                        control={control}
                        name="password"
                        type="password"
                        label="Mot de passe"
                        placeholder=""
                        error={errors.password?.message}
                    />
                    <button onClick={handleSubmit(onSubmit)} className="button-purple">Connexion</button>
                    <div className="login--form__register">
                        <p>Déjà un compte ?</p>
                        <Link to={"/login"}>Connecte-toi</Link>
                    </div>
                </form>
            </div>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modal--content">
                    <h2 className="modal--title">Compte créé avec succès</h2>
                    <p className="modal--text">Un email de confirmation a été envoyé à l'adresse indiquée.</p>
                    <button onClick={() => navigate("/login")} className="button-purple">Fermer</button>
                </div>
            </ReactModal>
        </Layout>
    );
}

export default Register;