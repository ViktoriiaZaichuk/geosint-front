import * as yup from "yup"

export const profilInfosSchema = yup.object().shape({
    pseudo: yup.string().test(
      'atLeastOneField',
      'Tu dois remplir au moins un champ',
      function (value, { parent }) {
        return !!value || !!parent.email;
      }
    ),
    email: yup.string().test(
      'atLeastOneField',
      'Tu dois remplir au moins un champ',
      function (value, { parent }) {
        return !!value || !!parent.pseudo;
      }
    ),
});

export const avatarSchema = yup.object().shape({
    avatar: yup.string().required()
})

export const passwordSchema = yup.object().shape({
    password: yup.string().min(8, "Ton mot de passe doit faire 8 charactères ou plus").required(),
    newPassword: yup.string().min(8, "Ton nouveau mot de passe doit faire 8 charactères ou plus").required(),
    confirmNewPassword: yup.string().min(8).oneOf([yup.ref("newPassword"), null], "Les mots de passe ne correspondent pas").required()
})