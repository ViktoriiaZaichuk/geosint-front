import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import Modal from 'react-modal';
import { updateChallenge } from "../../api/challenge";
import TextInput from '../../components/form/text_input';
import SelectLevel from "../../components/form/select_level";

const EditChallenge = ({ challenge }) => {
    const [showModal, setShowModal] = useState(false);

    const { 
      getValues,
      control,
      handleSubmit, 
      setValue,
      formState: { errors },
      reset
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
          challenge_id: challenge.id,
          name: challenge.name,
          level: challenge.level,
          answer_example: challenge.answer_example,
          description: challenge.description,
        }
    });

    const onSubmit = async (data) => {
      const nameValue = getValues("name")
      const levelValue = parseInt(getValues("level"), 10)
      const answerExampleValue = getValues("answer_example")
      const descriptionValue = getValues("description")

      const challengeId = challenge.id

      const updatedChallenge = {
        challenge_id: challengeId,
        name: nameValue,
        level: levelValue,
        answer_example: answerExampleValue,
        description: descriptionValue,
      };

      console.log(data)

      const response = await updateChallenge(updatedChallenge);

      if (response) {
        setShowModal(false);
      } else {
        console.error('Failed to update challenge.');
      }

      reset(updatedChallenge)
    };

    return (
        <div className='modal-edit'>
            <button 
            onClick={() => setShowModal(true)}
            className="button-purple"
            >
              Modifier le challenge
            </button>
            <Modal 
                isOpen={showModal}
                className="modal-edit--open"
            >   
                <div>
                  <h2>Modifier le challenge</h2>
                  <form>
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
                      // defaultValue={challenge.level}
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

                    <button 
                      type="submit"
                      className='button-purple'
                      onClick={handleSubmit(onSubmit)}
                    >
                      Enregistrer les modifications
                    </button>
                  </form>
                  <button 
                    onClick={() => setShowModal(false)}
                    className='button-green'
                  >
                    Fermer
                  </button>
                </div>
            </Modal>
        </div>
    )
}

export default EditChallenge