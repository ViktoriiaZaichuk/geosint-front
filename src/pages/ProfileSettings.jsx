import React, { useState } from 'react'
import LayoutDashboard from '../pages/LayoutDashboard'
import { useForm, Controller } from 'react-hook-form'
import Modal from 'react-modal'

import { ReactComponent as Avatar1 } from "../assets/icons/avatar1.svg"
import { ReactComponent as Avatar2 } from "../assets/icons/avatar2.svg"
import { ReactComponent as Avatar3 } from "../assets/icons/avatar3.svg"
import { ReactComponent as Avatar4 } from "../assets/icons/avatar4.svg"
import TextInput from '../components/form/text_input'
import { updateUser } from '../api/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../resolvers/profileSettings'

const ProfileSettings = () => {
    const [avatar, setAvatar] = useState(4)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [updatedModal, setUpdatedModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const { 
        getValues,
        handleSubmit, 
        control, 
        formState: { errors, isValid }
    } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmitProfilInfos = async () => {
        const formData = {
            pseudo: getValues('pseudo'),
            email: getValues('email'),
            description: getValues('description')
        }

        if (isValid) {
            const updated = await updateUser(formData)

            if (updated) {
                setUpdatedModal(true)
            } else {
                setErrorModal(true)
            }
        }
    }

    const onSubmitAvatar = async () => {
        const formData = {
            avatar: avatar
        }

        if (isValid) {
            const updated = await updateUser(formData)

            if (updated) {
                setUpdatedModal(true)
            } else {
                setErrorModal(true)
            }
        }
    }

    const onSubmitPassword = async () => {
        const formData = {
            password: getValues('newPassword')
        }

        if (isValid) {
            const updated = await updateUser(formData)

            if (updated) {
                setUpdatedModal(true)
            } else {
                setErrorModal(true)
            }
        }
    }

    return (
        <LayoutDashboard>
            <div className="dashboard-home--profile">
                <div className="dashboard-home--profile__avatar">
                    <Avatar4></Avatar4>
                </div>
            </div>

            <div className="dashboard-home--profiletxt">
                <span>Marie</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid...</p>
            </div>

            <div className="profile-settings">
                <div className="profile-settings profile-settings--infos">
                    <form className="login--form">
                        <h2 className="profile-settings--title">Changer les informations du profil</h2>
                        <TextInput
                            label="Pseudo"
                            placeholder="Marie"
                            type="text"
                            name="pseudo"
                            control={control}
                            error={errors.pseudo?.message}
                        />
                        <TextInput
                            label="Email"
                            placeholder="marie.b@gmail.com"
                            type="email"
                            name="email"
                            control={control}
                            error={errors.email?.message}
                        />
                        <div className="login--form__input">
                            <label htmlFor="description">Descriptif</label>
                            <Controller 
                                name="description"
                                control={control}
                                defaultValue = ''
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <textarea
                                        autoComplete="off"
                                        placeholder=""
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        rows="5"
                                        style={{ resize: "none" }}
                                    />
                                )}
                            />
                            {errors.description?.message && <p className="error">{errors.description?.message}</p>}
                        </div>
                        <button className="button-purple" onClick={handleSubmit(onSubmitProfilInfos)}>Enregistrer</button>
                    </form>
                </div>

                <div className="profile-settings profile-settings--avatar">
                    <div className="login--form">
                        <h2 className="profile-settings--title">Changer l'avatar</h2>
                        {
                            avatar === 1 ? <Avatar1 height={180} width={180} onClick={openModal} /> :
                            avatar === 2 ? <Avatar2 height={180} width={180} onClick={openModal} /> :
                            avatar === 3 ? <Avatar3 height={180} width={180} onClick={openModal} /> :
                            avatar === 4 ? <Avatar4 height={180} width={180} onClick={openModal} /> : null
                        }
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            className="modal"
                            overlayClassName="overlay"
                            appElement={document.getElementById('root')}
                        >
                            <div className="modal--content">
                                <div className="modal--content__avatar">
                                <Controller
                                    name="avatar"
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <ul>
                                            <li style={avatar === 1 ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                                <Avatar1 onClick={() => {
                                                    setAvatar(1)
                                                    onChange(1)
                                                }} />
                                            </li>
                                            <li style={avatar === 2 ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                                <Avatar2 onClick={() => {
                                                    setAvatar(2)
                                                    onChange(2)
                                                }} />
                                            </li>
                                            <li style={avatar === 3 ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                                <Avatar3 onClick={() => {
                                                    setAvatar(3)
                                                    onChange(3)
                                                }} />
                                            </li>
                                            <li style={avatar === 4 ? {backgroundColor: "#3E3E3E", borderRadius: "50%", padding: "5px"} : {backgroundColor: "#F6F6F6"}}>
                                                <Avatar4 onClick={() => {
                                                    setAvatar(4)
                                                    onChange(4)
                                                }} />
                                            </li>
                                        </ul>
                                    )}
                                />
                                </div>
                                <button className="button-purple" onClick={closeModal}>Valider</button>
                            </div>
                        </Modal>
                        <div className="profile-settings--avatar__buttons">
                            <button className="button-green" onClick={handleSubmit(onSubmitAvatar)}>Choisir</button>
                            <button className="button-purple">Uploader une image</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-settings">
                <div className="profile-settings profile-settings--password">
                    <form className="login--form">
                        <h2 className="profile-settings--title">Changer le mot de passe</h2>
                        <TextInput
                            label="Mot de passe actuel"
                            type="password"
                            name="password"
                            control={control}
                            error={errors.password?.message}
                        />
                        <TextInput
                            label="Nouveau mot de passe"
                            type="password"
                            name="newPassword"
                            control={control}
                            error={errors.newPassword?.message}
                        />
                        <TextInput
                            label="Confirmer le nouveau mot de passe"
                            type="password"
                            name="confirmNewPassword"
                            control={control}
                            error={errors.confirmNewPassword?.message}
                        />
                        <button className="button-purple" onClick={handleSubmit(onSubmitPassword)}>Enregistrer</button>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={updatedModal}
                onRequestClose={() => setUpdatedModal(false)}
                className="modal"
                overlayClassName="overlay"
                appElement={document.getElementById('root')}
            >
                <div className="modal--content">
                    <h2 className="modal--title">Vos informations ont bien été mises à jour</h2>
                    <button className="button-purple" onClick={() => setUpdatedModal(false)}>Fermer</button>
                </div>
            </Modal>
            <Modal
                isOpen={errorModal}
                onRequestClose={() => setErrorModal(false)}
                className="modal"
                overlayClassName="overlay"
                appElement={document.getElementById('root')}
            >
                <div className="modal--content">
                    <h2 className="modal--title">Une erreur est survenue, veuillez réessayer</h2>
                    <button className="button-purple" onClick={() => setErrorModal(false)}>Fermer</button>
                </div>
            </Modal>
        </LayoutDashboard>
    )
}

export default ProfileSettings