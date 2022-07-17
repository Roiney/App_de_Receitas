import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste na pagina /foods', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando a busca por categoria', async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');

    userEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );

      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    }, { timeout: 3000 });

    const allBtn = screen.getByTestId('All-category-filter');
    const beefBtn = screen.getByTestId('Beef-category-filter');
    const breakfastBtn = screen.getByTestId('Breakfast-category-filter');
    const chickenBtn = screen.getByTestId('Chicken-category-filter');
    const desertBtn = screen.getByTestId('Dessert-category-filter');
    const goatBtn = screen.getByTestId('Goat-category-filter');

    userEvent.click(allBtn);
    userEvent.click(beefBtn);
    userEvent.click(breakfastBtn);
    userEvent.click(chickenBtn);
    userEvent.click(desertBtn);
    userEvent.click(goatBtn);
   
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat');
    });
  });

  it('Testando se faz requisição corretamente buscando pelo nome', async () => {
    jest.spyOn(global, 'fetch');
    renderWithRouter(<App />);
    
    const searchBtn = await screen.findByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const searchBtn2 = screen.getByTestId('exec-search-btn');
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(searchBtn2);
    const firstCard = await screen.findByTestId('0-recipe-card');
    expect(firstCard).toBeInTheDocument();
  });
  
})