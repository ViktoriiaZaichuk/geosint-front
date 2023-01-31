import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Layout from "./LayoutHome";
import Input from "../components/textInput";
 
const Login = () => {
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
        </Layout>
    );
}

export default Login;