import React from "react";
import { Link } from "react-router-dom";

import Layout from "./LayoutHome";

const Login = () => {
    return (
        <Layout>
            <div className="login--page">
                <div className="login--header">
                    <div>
                        <Link><h2>Connexion</h2></Link>
                        <div className="login--header__underline" />
                    </div>
                    <Link><h2>Inscription</h2></Link>
                </div>
                <form className="login--form">
                    <div className="login--form__input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="login--form__input">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <Link to={"/forgotten_password"} className="login--form__link">Mot de passe oublié ?</Link>
                    <button type="submit" className="button-purple">Connexion</button>
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