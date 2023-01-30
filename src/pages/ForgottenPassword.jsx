import React from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import Layout from "./LayoutHome";
import Input from "../components/textInput";

const ForgottenPassword = () => {
    const { 
        control,
        handleSubmit, 
        formState: { errors, isValid } 
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const onSubmit = (data) => {
        isValid && console.log(data);
    }

    return (
        <Layout>
            <div className="login--page">
                <div className="forgotten-password--header">
                    <a>Réinitialiser le mot de passe <div className="forgotten-password--header__underline" /></a>
                </div>
                <form className="login--form">
                    <p>Renseigne l'adresse email associée à ton compte afin de recevoir les instructions pour changer de mot de passe.</p>
                    <Input 
                        control={control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        error={errors.email?.message}
                    />
                    <button onClick={handleSubmit(onSubmit)} className="button-purple">Envoyer</button>
                    <div className="login--form__register">
                        <p>Tu as déjà un compte ?</p>
                        <Link to={"/login"}>Connecte-toi</Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ForgottenPassword;