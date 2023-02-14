import * as yup from "yup"

const schema = yup.object().shape({
    email: yup.string().email().required("Ton email doit être valide"),
    password: yup.string().min(8, "Ton mot de passe doit faire 8 charactères ou plus").required()
}).required()

export default schema