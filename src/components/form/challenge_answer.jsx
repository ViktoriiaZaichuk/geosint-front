import React from "react";
import { useForm } from 'react-hook-form'
import Confetti from 'react-confetti'

import { checkAnswer } from '../../api/challenge'
import { ReactComponent as Minus } from '../../assets/icons/minus.svg'
import { ReactComponent as Check } from '../../assets/icons/check.svg'

const ChallengeAnswer = ({ challengeId, challengeInfoUpdateCallback }) => {
    const [answer, setAnswer] = React.useState(null)
    const [isCorrect, setIsCorrect] = React.useState(null)
    const [hasAnswered, setHasAnswered] = React.useState(false)
    const [helpInfo, setHelpInfo] = React.useState(null)
    const [challengeInfo, setChallengeInfo] = React.useState(null)

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
          setChallengeInfo(response.userChallenge)
        } else if (response.message === 'Wrong answer') {
          setIsCorrect(false)
          setHelpInfo(response.help)
          setChallengeInfo(response.userChallenge)
        }
        setHasAnswered(true)

        // Pass the updated challengeInfo to the parent component
        challengeInfoUpdateCallback(response.userChallenge);

        // Reset hasAnswered state to allow the user to submit another answer
        setHasAnswered(false);
    }
 
    return (
        <div>

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

            <div className='challenge-stats'>
                {answer && (
                    <div>
                        {isCorrect && (
                        <div>
                            <Confetti     
                                numberOfPieces={550}
                                recycle={false}
                                colors={['#CDB4FF', '#BFFFD6']} 
                            />
                            {challengeInfo && (
                            <div>
                                <h3>Félicitations, tu as trouvé la bonne réponse !</h3>
                                <p>Nombre de tentatives : <span className='span'>{challengeInfo.attempt}</span></p>
                                <p>Challenge score : <span className='span'>{challengeInfo.challenge_score}</span></p>
                            </div>
                            )}
                        </div>
                        )}

                        {!isCorrect && (
                            
                        <div>
                            {challengeInfo && (
                            <p>Nombre de tentatives : <span className='span'>{challengeInfo.attempt}</span></p>
                            )}
                            {helpInfo && (
                            <p className='cold-hot'>{helpInfo.ratio > 35.0 ? 'Tu refroidis 🥶' : 'Tu chauffes 🔥'}</p>
                            )}
                        </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChallengeAnswer