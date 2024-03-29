
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createChallenge } from '../src/api/challenge.js';
import CreateChallenge from '../src/pages/CreateChallenge';
import { UserContext } from '../src/context/UserContext';

jest.mock('../src/pages/LayoutDashboard', () => props => <div {...props} />);

jest.mock('../src/api/challenge.js', () => ({
    createChallenge: jest.fn(),
}));

describe('CreateChallenge', () => {
  it('should render without errors', () => {
    render(
      <UserContext.Provider value={{ user: {}, dispatch: jest.fn() }}>
        <BrowserRouter>
          <CreateChallenge />
        </BrowserRouter>
      </UserContext.Provider>
    );
  });

  it('submits the form and creates a challenge', async () => { 
      const { getByLabelText, getByText, queryByText  } = render(
        <UserContext.Provider value={{ user: {}, dispatch: jest.fn() }}>
          <BrowserRouter>
            <CreateChallenge />
          </BrowserRouter>
        </UserContext.Provider>
      );
  
      // Fill in the form fields
      fireEvent.change(getByLabelText('Nom du challenge'), { target: { value: 'My Challenge' } });
      fireEvent.change(getByLabelText('Niveau du challenge'), { target: { value: '2' } });
      fireEvent.change(getByLabelText('Réponse'), { target: { value: '42' } });
      fireEvent.change(getByLabelText('Type de réponse attendue'), { target: { value: 'Number' } });
      fireEvent.change(getByLabelText('Description'), { target: { value: 'Description of my challenge' } });
      const imageFile = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
      fireEvent.change(getByLabelText('Uploader une image'), { target: { files: [imageFile] } });
  
      // Submit the form
      act(() => {
        fireEvent.click(getByText('Créer'));
      });
  
      // Wait for the challenge to be created
      await waitFor(() => expect(createChallenge).toHaveBeenCalledTimes(1));
  
      // Check that the challenge was created with the correct data
      expect(createChallenge).toHaveBeenCalledWith({
        name: 'My Challenge',
        level: 2,
        answer: '42',
        answer_example: 'Number',
        description: 'Description of my challenge',
        image: imageFile,
        group_id: null,
      });
  });
  
  it('displays an error message if the form is submitted with invalid data', async () => {
      const { getByLabelText, getByText, queryByText } = render(
        <UserContext.Provider value={{ user: {}, dispatch: jest.fn() }}>
          <BrowserRouter>
            <CreateChallenge />
          </BrowserRouter>
        </UserContext.Provider>
      );
  
      // Submit the form without filling in any fields
      act(() => {
        fireEvent.click(getByText('Créer'));
      });
  
      // Check that an error message is displayed for each field
      expect(queryByText('Ce champ est requis')).toBeInTheDocument();
  
      // Fill in some fields with invalid data
      fireEvent.change(getByLabelText('Nom du challenge'), { target: { value: ' ' } });
      fireEvent.change(getByLabelText('Réponse'), { target: { value: '' } });
  
      // Submit the form again
      act(() => {
        fireEvent.click(getByText('Créer'));
      });
  
      // Check that the same error messages are still displayed
      expect(queryByText('Ce champ est requis')).toBeInTheDocument();
  });
});