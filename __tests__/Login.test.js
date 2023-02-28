import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Login from '../src/pages/Login';
import { UserContext } from '../src/context/UserContext';

jest.mock('../src/pages/LayoutHome', () => props => <div {...props} />);

describe('Login', () => {
    it('should render without errors', () => {
      render(
        <UserContext.Provider value={{ user: {}, dispatch: jest.fn() }}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </UserContext.Provider>
      );
    });

    it("submits the form with valid credentials", async () => {
        // Mock the loginUser function to return true
        jest.spyOn(require('../src/api/auth'), 'loginUser').mockImplementation(() => Promise.resolve(true));
    
        render(
            <UserContext.Provider value={{ user: {}, dispatch: jest.fn() }}>
              <BrowserRouter>
                <Login />
              </BrowserRouter>
            </UserContext.Provider>
        );
    
        // Fill in the form fields
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Mot de passe");
        userEvent.type(emailInput, 'user@example.com');
        userEvent.type(passwordInput, 'password123');
    
        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Connexion" }));
    });

    it("shows an error message with invalid credentials", async () => {
        // Mock the loginUser function to return false
        jest.spyOn(require('../src/api/auth'), 'loginUser').mockImplementation(() => Promise.resolve(false));
    
        render(
            <UserContext.Provider value={{ user: {}, dispatch: jest.fn() }}>
              <BrowserRouter>
                <Login />
              </BrowserRouter>
            </UserContext.Provider>
        );
    
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
    });
});