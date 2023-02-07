import React from "react";
import { useForm } from "react-hook-form";

import { ReactComponent as Minus } from '../../assets/icons/minus.svg'
import { ReactComponent as Check } from '../../assets/icons/check.svg'

const ChallengeAnswer = () => {
  const { register, handleSubmit } = useForm();
  const [answer, setAnswer] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(false);
  
  const correctAnswer = "correct";

  const onSubmit = (data) => {
    setAnswer(data.challengeAnswer);
    if (data.challengeAnswer === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <form 
        className="challenge-answer"
        onSubmit={handleSubmit(onSubmit)}
    >
      <div className="challenge-answer--form">
        <div>
            <label htmlFor="challenge-answer">Valider une réponse :</label>
            <input 
                type="text" 
                name="challengeAnswer" 
                {...register('challengeAnswer')} 
                placeholder="Ex."
            />
            <button type="submit">Submit</button>
        </div>
      </div>
      
      <div >
        {answer && (
          <div className="challenge-answer--validation">
            <div>
            {isCorrect ? (
                <div>
                    <Check></Check>
                    Reponse juste !
                </div>
            ) : (
                <div>
                    <Minus></Minus>
                    Reponse fausse !
                </div>
            )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default ChallengeAnswer;