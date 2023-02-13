import React from "react";
import FooterDashboard from "../components/navigation/footer_dashboard";
import LayoutDashboard from "./LayoutDashboard";
import { useForm, Controller } from "react-hook-form";
import TextInput from '../components/form/text_input';
import SelectLevel from "../components/form/select_level";
import UploadImage from "../components/form/upload_image";
import { createChallenge } from "../api/challenge";

import { ReactComponent as GlobeImg } from '../assets/img/globe.svg'
import { ReactComponent as Lightening } from '../assets/icons/lightening.svg'

const CreateChallenge = () => {
    const { 
        getValues,
        control,
        handleSubmit, 
        setValue,
        triggerValidation,
        formState: { errors },
        reset
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const handleImageChange = (image) => {
        setValue("image", image);
    };

    const onSubmit = async (data) => {
        const nameValue = getValues("name")
        const levelValue = parseInt(getValues("level"), 10)
        const answerValue = getValues("answer")
        const answerExampleValue = getValues("answer_example")
        const descriptionValue = getValues("description")
        const imageValue = getValues("image")
        const group_id = null

        data.image = imageValue

        console.log(data)

        const isChallengeCreated = await createChallenge({
            ...data,
            level: levelValue,
            group_id,
        })

        reset({ 
            name: nameValue,
            level: levelValue, 
            answer: answerValue, 
            answer_example: answerExampleValue, 
            description: descriptionValue,
            image: imageValue,
            group_id,
        })
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
                            name="name"
                            control={control}
                            error={errors.name?.message}
                        />
                        <Controller 
                            name="level"
                            control={control}
                            defaultValue={1}
                            render={({ field: { value, onChange } }) => (
                                <SelectLevel 
                                    label="Niveau du challenge"
                                    name="level"
                                    type="number"
                                    onChange={onChange}
                                    value={value || 1}
                                />
                            )}
                        />

                        <TextInput
                            label="Réponse"
                            placeholder="Ex."
                            type="text"
                            name="answer"
                            control={control}
                            error={errors.answer?.message}
                        />

                        <TextInput
                            label="Type de réponse attendue"
                            placeholder="Ex."
                            type="text"
                            name="answer_example"
                            control={control}
                            error={errors.answer_example?.message}
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
                            name="image"
                            label="Uploader une image" 
                            onImageChange={handleImageChange}
                        />             

                        <button className="button-purple" onClick={handleSubmit(onSubmit)}>Créer</button>
                    </form>
                </div>
                <div className="create-challenge--content__img">
                    {   
                        getValues("image") ? 
                        <div className="chosen-image">
                            <img src={getValues("image")} alt="Uploaded Image"/> 
                        </div>
                        
                        : <GlobeImg></GlobeImg> 
                    }
                </div>
            </div>
            <FooterDashboard></FooterDashboard>
        </LayoutDashboard>
    )  
}

export default CreateChallenge;

