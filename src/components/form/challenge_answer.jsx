import React from "react"
import { useForm, Controller } from 'react-hook-form'

import { checkAnswer } from '../../api/challenge'
import { ReactComponent as Minus } from '../../assets/icons/minus.svg'
import { ReactComponent as Check } from '../../assets/icons/check.svg'
import wait from '../../utils/wait'

const ChallengeAnswer = ({ challengeId, challengeInfoUpdateCallback, isCorrect, setIsCorrect }) => {
    const [answer, setAnswer] = React.useState(null)
    const [hasAnswered, setHasAnswered] = React.useState(false)
    const [helpInfo, setHelpInfo] = React.useState(null)
    const [challengeInfo, setChallengeInfo] = React.useState(null)
    const [isSingleQuoteTyped, setIsSingleQuoteTyped] = React.useState(false);

    const { handleSubmit, control } = useForm()

    const handleKeyPress = (e) => {
        if (e.key === "'") {
            setIsSingleQuoteTyped(true);
        } else {
            setIsSingleQuoteTyped(false);
        }
    }

    const onSubmit = async (data) => {
        if (hasAnswered) {
          // User has already submitted an answer
          return
        }
    
        setAnswer(data.challengeAnswer)
        const response = await checkAnswer(challengeId, data.challengeAnswer)
        setHasAnswered(true)
        if (response.message === 'Right answer') {
            setIsCorrect(true)
            setChallengeInfo(response.userChallenge)
        } else if (response.message === 'Wrong answer') {
            setIsCorrect(false)
            setHelpInfo(response.help)
            setChallengeInfo(response.userChallenge)
            // Reset hasAnswered state to allow the user to submit another answer
            await wait(3000)
            setHasAnswered(false)
        }

        // Pass the updated challengeInfo to the parent component
        challengeInfoUpdateCallback(response.userChallenge)
    }
 
    return (
        <div>
            <form className="challenge-answer" onSubmit={handleSubmit(onSubmit)}>
                <div className="challenge-answer--form">
                    <div>
                        <label htmlFor="challenge-answer">
                            Valider une réponse :
                        </label>
                        <Controller
                            name="challengeAnswer"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <input
                                    id="challenge-answer"
                                    type="text"
                                    name="challengeAnswer"
                                    placeholder="Ex."
                                    onChange={(e) => onChange(e.target.value.replace("'", ""))}
                                    onBlur={onBlur}
                                    value={value}
                                    onKeyPress={handleKeyPress}
                                />
                            )}
                        />
                        <button type="submit">OK</button>
                        {isSingleQuoteTyped && <p className="error">Les apostrophes ne sont pas autorisées</p>}
                    </div>
                </div>

                <div>
                    {answer && (
                        <div className="challenge-answer--validation">
                            <div>
                                {hasAnswered ? (
                                    isCorrect ? (
                                        <div >
                                            <Check></Check>
                                            Reponse juste !
                                        </div>
                                    ) : (
                                        <div >
                                            <Minus></Minus>
                                            Reponse fausse
                                        </div>
                                    )
                                ) : (
                                    <div >
                                        Retente ta chance...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </form>

            <div className='challenge-stats'>
                {answer && (
                    <div className="dark">
                        {isCorrect && (
                            <div>
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