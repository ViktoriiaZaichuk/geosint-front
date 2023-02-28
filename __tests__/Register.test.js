import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { registerUser } from "../src/api/auth";
import Register from '../src/pages/Register';

jest.mock("../src/api/auth", () => ({
    registerUser: jest.fn(),
}));

jest.mock('../src/pages/LayoutHome', () => props => <div {...props} />);

describe('Register', () => {
    it('should render without errors', () => {
        render(<Register />, {wrapper: BrowserRouter});
    });

    it('should open the success modal when registration is successful', async () => {
        registerUser.mockResolvedValueOnce(true);
        render(<Register />, { wrapper: BrowserRouter });
      
        userEvent.click(screen.getByRole('button', { name: 'Connexion', class: 'login-btn' }));
        await waitFor(() => {
          userEvent.type(screen.getByLabelText('Pseudo'), 'testuser');
          userEvent.type(screen.getByLabelText('Email'), 'testuser@test.com');
          userEvent.type(screen.getByLabelText('Mot de passe'), 'password');
          userEvent.type(screen.getByLabelText('Confirme ton mot de passe'), 'password');
          userEvent.click(screen.getByRole('button', { name: 'Connexion' }));
        });
      
        // Check that the success modal appears
        const modalTitle = screen.getByText('Compte créé avec succès');
        expect(modalTitle).toBeInTheDocument();
    });

    it('should display error messages when fields are incorrect', async () => {
        render(<Register />, {wrapper: BrowserRouter});
      
        // Fill out the form with incorrect data and submit it
        userEvent.click(screen.getByRole('button', { name: 'Connexion', class: 'login-btn' }));
        await waitFor(() => {
          userEvent.type(screen.getByLabelText('Pseudo'), 'te'); // Too short
          userEvent.type(screen.getByLabelText('Email'), 'invalidemail'); // Invalid email format
          userEvent.type(screen.getByLabelText('Mot de passe'), 'password');
          userEvent.type(screen.getByLabelText('Confirme ton mot de passe'), 'notpassword'); // Mismatched password
          userEvent.click(screen.getByRole('button', {name: 'Connexion'}));
        });
      
        // Check that error messages appear for each incorrect field
        const pseudoError = screen.getByText('Le pseudo doit faire au moins 3 caractères');
        expect(pseudoError).toBeInTheDocument();
        const emailError = screen.getByText('Veuillez saisir une adresse email valide');
        expect(emailError).toBeInTheDocument();
        const passwordError = screen.getByText('Les mots de passe doivent correspondre');
        expect(passwordError).toBeInTheDocument();
    });
});