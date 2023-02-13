import * as yup from "yup"

const pseudoSchema = yup.string().min(3, "Ton pseudo doit faire au moins 3 charactères").required()
const emailSchema = yup.string().email("Ton email doit être valide").required()
const descriptionSchema = yup.string().min(10, "Ta description doit faire au moins 10 charactères").required()

const pseudoEmailDescriptionSchema = yup.object().shape({
    pseudo: pseudoSchema,
    email: emailSchema,
    description: descriptionSchema
}).oneOf([pseudoSchema, emailSchema, descriptionSchema]).required()

const avatarSchema = yup.object().shape({
    avatar: yup.string().required()
})

const passwordSchema = yup.object().shape({
    password: yup.string().min(8, "Ton mot de passe doit faire 8 charactères ou plus").required(),
    newPassword: yup.string().min(8, "Ton nouveau mot de passe doit faire 8 charactères ou plus").required(),
    confirmNewPassword: yup.string().min(8).oneOf([yup.ref("newPassword"), null], "Les mots de passe ne correspondent pas").required()
})

export const schema = yup.lazy((value) => {
    let newSchema = yup.object().shape({})
    
    if (value.pseudo || value.email || value.description) {
        newSchema = newSchema.concat(pseudoEmailDescriptionSchema)
    }
    
    if (value.avatar) {
        newSchema = newSchema.concat(avatarSchema)
    }
    
    if (value.password && value.newPassword && value.confirmNewPassword) {
        newSchema = newSchema.concat(passwordSchema)
    }
    
    return newSchema
})
