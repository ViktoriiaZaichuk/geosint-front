import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; 
import EditChallenge from '../src/components/form/edit_challenge';
import { updateChallenge } from '../src/api/challenge.js';

jest.mock('../src/api/challenge.js', () => ({
    updateChallenge: jest.fn().mockResolvedValue({}),
}));

describe('EditChallenge', () => {
    const challenge = {
        id: 1,
        name: 'Challenge 1',
        level: 2,
        answer_example: 'Answer 1',
        description: 'Description 1',
    };

    it('should render without errors', () => {
        render(<EditChallenge challenge={challenge} />, {wrapper: BrowserRouter});
    });

    it('shows the modal when the button is clicked', () => {
        render(<EditChallenge challenge={challenge} />, {wrapper: BrowserRouter});
        const editButtons = screen.queryAllByText('Modifier le challenge');
        expect(editButtons).toHaveLength(1); 
        fireEvent.click(editButtons[0]);
        const modalTitles = screen.queryAllByText('Modifier le challenge');
        expect(modalTitles).toHaveLength(2); 
        expect(modalTitles[1]).toBeInTheDocument(); 
    });

    it('updates the challenge when the form is submitted', async () => {
        const updatedChallenge = {
            challenge_id: 1,
            name: 'New Challenge',
            description: 'New Description',
            level: 1,
            answer_example: 'New Answer',
          };
    
        render(<EditChallenge challenge={challenge} />);
        fireEvent.click(screen.getByText('Modifier le challenge'));
    
        await act(async () => {
          fireEvent.change(screen.getByLabelText('Nom du challenge'), {
            target: { value: updatedChallenge.name },
          });
          userEvent.selectOptions(screen.getByLabelText('Niveau du challenge'), updatedChallenge.level.toString());
          fireEvent.change(screen.getByLabelText('Type de réponse attendue'), {
            target: { value: updatedChallenge.answer_example },
          });
          fireEvent.change(screen.getByLabelText('Description'), {
            target: { value: updatedChallenge.description },
          });
          fireEvent.click(screen.getByText('Enregistrer les modifications'));
        });
    
        expect(updateChallenge).toHaveBeenCalledWith(updatedChallenge);
    });
});