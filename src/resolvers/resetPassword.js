import * as yup from "yup"

const passwordSchema = yup.object().shape({
    newPassword: yup.string().min(8, "Ton nouveau mot de passe doit faire 8 charactères ou plus").required(),
    confirmNewPassword: yup.string().min(8).oneOf([yup.ref("newPassword"), null], "Les mots de passe ne correspondent pas").required()
})

export default passwordSchema