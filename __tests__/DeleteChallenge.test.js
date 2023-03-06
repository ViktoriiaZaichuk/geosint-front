import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import DeleteChallenge from '../src/components/form/delete_challenge';

const mockNavigate = jest.fn();

jest.mock('../src/api/challenge.js', () => ({
  deleteChallenge: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('DeleteChallenge', () => {
  const challengeId = '123';

  it('should render without errors', () => {
    render(<DeleteChallenge challengeId={challengeId} />, {wrapper: BrowserRouter});
  });

  it('should open the modal when the delete button is clicked', () => {
    render(<DeleteChallenge challengeId={challengeId} />, {wrapper: BrowserRouter});
    const deleteButton = screen.getByText('Supprimer le challenge');
    fireEvent.click(deleteButton);
    const modalTitle = screen.getByText('Êtes-vous sûr(e) de vouloir supprimer ce challenge ?');
    expect(modalTitle).toBeInTheDocument();
  });

  it('should call the deleteChallenge function when the confirmation button is clicked', async () => {
    const deleteChallengeMock = require('../src/api/challenge.js').deleteChallenge;
    deleteChallengeMock.mockResolvedValue(true);
    render(<DeleteChallenge challengeId={challengeId} />, {wrapper: BrowserRouter});
    const deleteButton = screen.getByText('Supprimer le challenge');
    fireEvent.click(deleteButton);
    const confirmationButton = screen.getByText('Oui, le supprimer');
    fireEvent.click(confirmationButton);
    expect(deleteChallengeMock).toHaveBeenCalledWith(challengeId);
  });

  it('should navigate to the challenges list page when the challenge is successfully deleted', async () => {
    const deleteChallengeMock = require('../src/api/challenge.js').deleteChallenge;
    deleteChallengeMock.mockResolvedValue(true);
    render(<DeleteChallenge challengeId={challengeId} />, {wrapper: BrowserRouter});
    const deleteButton = screen.getByText('Supprimer le challenge');
    fireEvent.click(deleteButton);
    const confirmationButton = screen.getByText('Oui, le supprimer');
    fireEvent.click(confirmationButton);
    await expect(deleteChallengeMock).toHaveBeenCalledWith(challengeId);
    expect(mockNavigate).toHaveBeenCalledWith('/challenges_list');
  });

});