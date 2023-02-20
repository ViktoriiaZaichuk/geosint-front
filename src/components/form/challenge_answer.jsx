import React from 'react'
import { useForm } from 'react-hook-form'

import { checkAnswer } from '../../api/challenge'
import { ReactComponent as Minus } from '../../assets/icons/minus.svg'
import { ReactComponent as Check } from '../../assets/icons/check.svg'

const ChallengeAnswer = ({ challengeId }) => {
    const [answer, setAnswer] = React.useState(null)
    const [isCorrect, setIsCorrect] = React.useState(null)
    const [hasAnswered, setHasAnswered] = React.useState(false)

    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        if (hasAnswered) {
          // User has already submitted an answer
          return
        }
    
        setAnswer(data.challengeAnswer)
        const response = await checkAnswer(challengeId, data.challengeAnswer)
        if (response.message === 'Right answer') {
          setIsCorrect(true)
        } else if (response.message === 'Wrong answer') {
          setIsCorrect(false)
        }
        setHasAnswered(true)
      }
 
    return (
        <form className="challenge-answer" onSubmit={handleSubmit(onSubmit)}>
            <div className="challenge-answer--form">
                <div>
                    <label htmlFor="challenge-answer">
                        Valider une réponse :
                    </label>
                    <input
                        type="text"
                        name="challengeAnswer"
                        {...register('challengeAnswer')}
                        placeholder="Ex."
                    />
                    <button type="submit">Submit</button>
                </div>
            </div>

            <div>
                {answer && (
                <div className="challenge-answer--validation">
                    <div>
                    {hasAnswered ? (
                        isCorrect ? (
                        <div>
                            <Check></Check>
                            Reponse juste !
                        </div>
                        ) : (
                        <div>
                            <Minus></Minus>
                            Reponse fausse
                        </div>
                        )
                    ) : (
                        <div>
                        En attente de réponse...
                        </div>
                    )}
                    </div>
                </div>
                )}
            </div>
        </form>
    )
}

export default ChallengeAnswer