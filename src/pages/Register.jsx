import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import Layout from "./LayoutHome";
import Input from "../components/form/text_input";
import { registerUser } from "../api/auth";
import { ReactComponent as Avatar1 } from "../assets/icons/avatar1.svg";
import { ReactComponent as Avatar2 } from "../assets/icons/avatar2.svg";
import { ReactComponent as Avatar3 } from "../assets/icons/avatar3.svg";
import { ReactComponent as Avatar4 } from "../assets/icons/avatar4.svg";

const Register = () => {
    const navigate = useNavigate()

    const { 
        getValues,
        control,
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const onSubmit = async (data) => {
        const avatarValue = getValues("avatar")
        const usernameValue = getValues("username")
        const emailValue = getValues("email")

        const isRegister = await registerUser(data)

        if (isRegister) {
            return navigate("/login")
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
                                    <li style={value === "avatar1" ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                        <Avatar1 onClick={() => onChange("avatar1")} />
                                    </li>
                                    <li style={value === "avatar2" ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                        <Avatar2 onClick={() => onChange("avatar2")} />
                                    </li>
                                    <li style={value === "avatar3" ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                        <Avatar3 onClick={() => onChange("avatar3")} />
                                    </li>
                                    <li style={value === "avatar4" ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                        <Avatar4 onClick={() => onChange("avatar4")} />
                                    </li>
                                </ul>
                            )}
                        />
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
        </Layout>
    );
}

export default Register;