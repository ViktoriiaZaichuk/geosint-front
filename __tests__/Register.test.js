import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { registerUser } from "../src/api/auth";
import Register from '../src/pages/Register';
import Layout from '../src/pages/LayoutHome';

jest.mock("../src/api/auth", () => ({
    registerUser: jest.fn(),
}));

describe('Register', () => {
    it('should render without errors', () => {
        render(<Register />, {wrapper: BrowserRouter});
    });

/*     test("registers a user successfully", async () => {
        const registerUserMock = jest.fn().mockResolvedValue(true);
        const navigateMock = jest.fn();
        const { getByLabelText, getByRole } = render(
          <Register registerUser={registerUserMock} navigate={navigateMock} />,
          {wrapper: BrowserRouter}
        );
    
        fireEvent.click(getByRole("button", { name: "Connexion" }));
    
        await waitFor(() => {
          expect(registerUserMock).toHaveBeenCalledTimes(1);
          expect(registerUserMock).toHaveBeenCalledWith({
            avatar: null,
            username: "",
            email: "",
            password: "",
            password_confirmation: ""
          });
          expect(navigateMock).toHaveBeenCalledTimes(1);
          expect(navigateMock).toHaveBeenCalledWith("/login");
        });
      }); */


/*       test("displays error messages for invalid inputs", async () => {
        const registerUserMock = jest.fn().mockResolvedValue(true);
        const navigateMock = jest.fn();
        const { getByLabelText, getByRole, getByText } = render(
          <Register registerUser={registerUserMock} navigate={navigateMock} />
        );
    
        fireEvent.change(getByLabelText("Pseudo"), { target: { value: "" } });
        fireEvent.change(getByLabelText("Email"), { target: { value: "notanemail" } });
        fireEvent.change(getByLabelText("Mot de passe"), { target: { value: "password" } });
        fireEvent.change(getByLabelText("Confirme ton mot de passe"), { target: { value: "notmatching" } });
        fireEvent.click(getByRole("button", { name: "Connexion" }));
    
        await waitFor(() => {
          expect(registerUserMock).toHaveBeenCalledTimes(0);
          expect(getByText("Ce champ est obligatoire")).toBeInTheDocument();
          expect(getByText("Adresse email invalide")).toBeInTheDocument();
          expect(getByText("Le mot de passe doit contenir au moins 8 caractères")).toBeInTheDocument();
          expect(getByText("Les mots de passe ne correspondent pas")).toBeInTheDocument();
        });
      }); */
});