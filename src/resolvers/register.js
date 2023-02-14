import * as yup from "yup"

const schema = yup.object().shape({
    avatar: yup.string().required("Vous devez choisir un avatar"),
    username: yup.string().min(3, "Ton pseudo doit faire au moins 3 charactères").required(),
    email: yup.string().email().required("Ton email doit être valide"),
    password: yup.string().min(8, "Ton mot de passe doit faire 8 charactères ou plus").required(),
}).required()

export default schema