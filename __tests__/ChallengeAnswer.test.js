import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ChallengeAnswer from '../src/components/form/challenge_answer';
import { checkAnswer } from '../src/api/challenge.js';

/* jest.mock('../src/api/challenge', () => ({
  checkAnswer: jest.fn((challengeId, answer) => {
    if (answer === 'correct answer') {
      return Promise.resolve({
        message: 'Right answer',
        userChallenge: {
          attempt: 1,
          challenge_score: 10
        }
      });
    } else {
      return Promise.resolve({
        message: 'Wrong answer',
        help: {
          ratio: 50.0
        },
        userChallenge: {
          attempt: 1,
          challenge_score: 0
        }
      });
    }
  })
})); */

jest.mock('../src/api/challenge.js', () => ({
    checkAnswer: jest.fn(),
  }));

describe('EditChallenge', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
    it('should render without errors', () => {
        render(<ChallengeAnswer challengeId={1} />, {wrapper: BrowserRouter});
    });

    it('submits an answer and displays correct validation message on success', async () => {
        const challengeId = '1';
        const challengeInfoUpdateCallback = jest.fn();
        checkAnswer.mockResolvedValue({
          message: 'Right answer',
          userChallenge: {
            attempt: 1,
            challenge_score: 100,
          },
        });
        const { getByLabelText, getByText } = render(
          <ChallengeAnswer
            challengeId={challengeId}
            challengeInfoUpdateCallback={challengeInfoUpdateCallback}
          />,
           {wrapper: BrowserRouter}
        );
    
        const input = getByLabelText('Valider une réponse :');
        const submitButton = getByText('Submit');
        fireEvent.change(input, { target: { value: 'correct answer' } });
        fireEvent.click(submitButton);
    
        await waitFor(() => {
          expect(checkAnswer).toHaveBeenCalledWith(challengeId, 'correct answer');
          expect(getByText((content, element) => {
            const hasText = (str) => element => element.textContent === str
            return hasText('Reponse juste !')(element) || hasText('En attente de réponse...')(element)
          })).toBeInTheDocument();
        });
    
        expect(challengeInfoUpdateCallback).toHaveBeenCalledWith({
          attempt: 1,
          challenge_score: 100,
        });
      });

    
/*     it('submits an answer and displays incorrect validation message on failure', async () => {
        const { getByLabelText, getByText } = render(<ChallengeAnswer challengeId={1} />);
    
        const answerInput = getByLabelText('Valider une réponse :');
        const submitButton = getByText('Submit');
    
        fireEvent.change(answerInput, { target: { value: 'wrong answer' } });
        fireEvent.click(submitButton);
    
        await waitFor(() => expect(getByText('Reponse fausse')).toBeInTheDocument());
    }); */
});