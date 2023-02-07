import React from "react";
import FooterDashboard from "../components/navigation/footer_dashboard";
import LayoutDashboard from "./LayoutDashboard";
import { useForm, Controller } from "react-hook-form";
import TextInput from '../components/form/text_input';
import SelectLevel from "../components/form/select_level";
import UploadImage from "../components/form/upload_image";

import { ReactComponent as GlobeImg } from '../assets/img/globe.svg'
import { ReactComponent as Lightening } from '../assets/icons/lightening.svg'

const CreateChallenge = () => {
    const { 
        control,
        handleSubmit, 
        register,
        formState: { errors, isValid } 
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });


    const onSubmit = (data) => {
        isValid && console.log(data);
    }

    return (
        <LayoutDashboard className="create-challenge">
            <div className="create-challenge--title">
                <h1>Créer un challenge</h1>
                <Lightening></Lightening>
            </div>

            <div className="create-challenge--content">
                <div className="create-challenge--content__form">
                    <form className="login--form">
                        <TextInput
                            label="Nom du challenge"
                            placeholder="Ex."
                            type="text"
                            name="Nom du challenge"
                            control={control}
                            error={errors.pseudo?.message}
                        />

                        <SelectLevel 
                            label="Niveau du challenge"
                        />

                        <TextInput
                            label="Type de réponse attendue"
                            placeholder="Ex."
                            type="text"
                            name="Type de réponse attendue"
                            control={control}
                            error={errors.pseudo?.message}
                        />
                       <div className="login--form__input">
                            <label htmlFor="description">Description</label>
                            <Controller 
                                name="description"
                                control={control}
                                defaultValue = ''
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <textarea
                                        autoComplete="off"
                                        placeholder="Ex."
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        rows="5"
                                        style={{ resize: "vertical" }}
                                    />
                                )}
                            />
                            {errors.description?.message && <p className="error">{errors.description?.message}</p>}
                        </div> 
                        <UploadImage
                            label="Uploader une image"
                            ref={register}
                        />             

                        <button className="button-purple" onClick={handleSubmit(onSubmit)}>Créer</button>
                    </form>
                </div>
                <div className="create-challenge--content__img">
                    <GlobeImg></GlobeImg>
                </div>
            </div>
            <FooterDashboard></FooterDashboard>
        </LayoutDashboard>
    )  
}

export default CreateChallenge;

