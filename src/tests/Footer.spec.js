import React from "react";
import App from '../App';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

describe('Testar o componente Footer e suas funcionalidade', () => {
    it('O coponente Footer é renderizada nas rotas indicadas',()=>{
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'teste@teste.com');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const Footer = screen.getByTestId('footer');
    expect(Footer).toBeInTheDocument();
    })

})