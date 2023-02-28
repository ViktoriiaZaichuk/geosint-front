import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from '../src/pages/Login';

jest.mock('../src/context/UserContext', () => ({
    UserContext: {
      Consumer: ({ children }) => children({ user: {}, dispatch: jest.fn() }),
    },
}));


describe('Login', () => {
    it('should render without errors', () => {
        render(<Login />, {wrapper: BrowserRouter});
    });

/*     it("submits the form with valid credentials", async () => {
        // Mock the loginUser function to return true
        jest.spyOn(require('../src/api/auth'), 'loginUser').mockImplementation(() => Promise.resolve(true));
    
        render(<Login />, {wrapper: BrowserRouter});
    
        // Fill in the form fields
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Mot de passe");
        userEvent.type(emailInput, 'user@example.com');
        userEvent.type(passwordInput, 'password123');
    
        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Connexion" }));
    
        // Wait for the form to submit and redirect to homepage
        const homepage = await screen.findByText("Homepage");
        expect(homepage).toBeInTheDocument();
      }); */

/*     it("shows an error message with invalid credentials", async () => {
        // Mock the loginUser function to return false
        jest.spyOn(require('../src/api/auth'), 'loginUser').mockImplementation(() => Promise.resolve(false));
    
        render(<Login />, {wrapper: BrowserRouter});
    
        // Fill in the form fields with invalid credentials
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Mot de passe");
        userEvent.type(emailInput, 'invalid@example.com');
        userEvent.type(passwordInput, 'wrongpassword');
    
        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Connexion" }));
    
        // Check that an error message is displayed
        const errorMessage = await screen.findByText("Email ou mot de passe incorrect");
        expect(errorMessage).toBeInTheDocument();
    }); */
});