import React from 'react';
import App from '../App';
import Recipes from '../pages/Recipes';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

describe('Testar o componente Header com suas funcionalidades', () => {
  it('Verifica se existem os botões profile e search na página Drinks e se os mesmos executam suas devidas funções', async () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/drinks');
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);
    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();
    userEvent.click(buttonSearch);
    expect(input).not.toBeInTheDocument();
    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
  });
})