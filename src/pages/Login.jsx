import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'

import { UserContext } from "../context/UserContext";
import Layout from "./LayoutHome";
import Input from "../components/form/text_input";
import { loginUser } from "../api/auth";
import ReactModal from "react-modal";
import schema from "../resolvers/login"
import { ThemeContext } from "../context/ThemeContext";
 
const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [loginError, setLoginError] = useState(false)

    const navigate = useNavigate()

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const { user, dispatch } = useContext(UserContext);
    const { theme } = useContext(ThemeContext)

    const { 
        getValues,
        control,
        handleSubmit, 
        formState: { errors, isSubmitted },
        reset 
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const emailValue = getValues("email")

        const { email, password } = data

        const isLogin = await loginUser(dispatch, email, password)

        if (isLogin) {
            return navigate("/")
        } else {
            setLoginError(true)
        }

        reset({ email: emailValue, password: "" })
    }

    return (
        <Layout>
            <div className={theme === "light" ? "login--page" : "login--page dark"}>
                <div className="login--header">
                    <div>
                        <Link to={"/login"}>Connexion</Link>
                        <div className="login--header__underline" />
                    </div>
                    <Link to={"/register"}>Inscription</Link>
                </div>
                <form className="login--form">
                    <Input 
                        control={control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        error={errors.email?.message}
                    />
                    <Input
                        control={control}
                        name="password"
                        type="password"
                        label="Mot de passe"
                        placeholder="********"
                        error={errors.password?.message}
                    />
                    <Link to={"/forgotten_password"} className="login--form__link">Mot de passe oublié ?</Link>
                    <button onClick={handleSubmit(onSubmit)} className={"button-purple"}>Connexion</button>
                    {loginError && <p className="login--form__error">Email ou mot de passe incorrect</p>}
                    <div className="login--form__register">
                        <p>Tu n'as pas de compte ?</p>
                        <Link to={"/register"}>Inscris-toi</Link>
                    </div>
                </form>
            </div>

            {(user.errorMessage !== null && isSubmitted) && (
                <ReactModal
                    isOpen={isModalOpen}
                    className="modal"
                    overlayClassName="overlay"
                    onRequestClose={toggleModal}
                    shouldCloseOnOverlayClick={true}
                    appElement={document.getElementById("root")}
                >
                    <div className="modal--content">
                        <h2 className="modal--title">Erreur</h2>
                        <p className="modal--text">{user.errorMessage}</p>
                        <button className="button-purple" onClick={toggleModal}>Fermer</button>
                    </div>
                </ReactModal>
            )}
        </Layout>
    );
}

export default Login;