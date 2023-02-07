import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserContext";
import Layout from "./LayoutHome";
<<<<<<< HEAD
import Input from "../components/form/text_input";
=======
import Input from "../components/textInput";
import { loginUser } from "../api/auth";
import ReactModal from "react-modal";
// import { loginSchema } from "../utils/validationSchemas"
>>>>>>> login-from-api
 
const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const navigate = useNavigate()

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const { user, dispatch } = useContext(UserContext);

    const { 
        getValues,
        control,
        handleSubmit, 
        formState: { errors, isSubmitted },
        reset 
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const onSubmit = (data) => {
<<<<<<< HEAD
        isValid && console.log(data);
    } 
=======
        const emailValue = getValues("email")

        const { email, password } = data

        const isLogin = loginUser(dispatch, email, password)

        if (isLogin) {
            return navigate("/")
        }

        reset({ email: emailValue, password: "" })
    }
>>>>>>> login-from-api

    return (
        <Layout>
            <div className="login--page">
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
                        placeholder="Mot de passe"
                        error={errors.password?.message}
                    />
                    <Link to={"/forgotten_password"} className="login--form__link">Mot de passe oublié ?</Link>
                    <button onClick={handleSubmit(onSubmit)} className="button-purple">Connexion</button>
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
                    onRequestClose={closeModal}
                    shouldCloseOnOverlayClick={true}
                    appElement={document.getElementById("root")}
                >
                    <div className="modal--content">
                        <h2 className="modal--title">Erreur</h2>
                        <p className="modal--text">{user.errorMessage}</p>
                        <button className="button-purple" onClick={closeModal}>Fermer</button>
                    </div>
                </ReactModal>
            )}
        </Layout>
    );
}

export default Login;