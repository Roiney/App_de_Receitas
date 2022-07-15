import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

const NUMBER = 30000;

describe('Testar componente SearchBar', () => {
  jest.setTimeout(NUMBER);
  it('Testando Filtro de buscas renderizados na Página', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'teste@teste.com');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const ingredientEl = screen.getByText(/Ingredient/i);
    const nameEl = screen.getByText(/Name/i);
    const FirstLetterEl = screen.getByText(/First Letter/i);
    const btn = screen.getByRole('button', {
      name: /buscar/i
    })
    expect(ingredientEl).toBeDefined();
    expect(nameEl).toBeDefined();
    expect(FirstLetterEl).toBeDefined();
    expect(btn).toBeDefined();
  });

  it('Teste Filtro de busca, Primeira Letra da página Principal', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const firstLetter = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);
    const inputField = screen.queryByPlaceholderText(/search/i);
    userEvent.click(firstLetter);
    userEvent.type(inputField, 'e');
    const searchButton = screen.getByRole('button', {
      name: /buscar/i
    })
    userEvent.click(searchButton);
    const etonMessSearch = await screen.findByText(/Eton Mess/i);
    const etonMessImg = await screen.findByTestId('0-card-img');
    expect(etonMessSearch).toBeInTheDocument();
    expect(etonMessImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg');
  });

  it('Testa se os botões de filtro funcionam corretamente.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const ingredientFilter = screen.getByText('Ingredient');
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);
    const inputField = screen.queryByPlaceholderText(/search/i);
    userEvent.click(ingredientFilter);
    userEvent.type(inputField, 'Salmon');
    const searchButton = screen.getByRole('button', {
      name: /buscar/i
    })
    userEvent.click(searchButton);

    const recipes = await screen.findByText(/baked salmon with fennel & tomatoes/i)
    expect(recipes).toBeInTheDocument();
  });

  it('testando os inputs', () => {
    const domAlert = window.alert; 
    window.alert = () => {};
    const { history } = renderWithRouter(<App />);
    history.push('/foods')
    const searchiconBtn = screen.getByTestId('search-top-btn');
    expect(searchiconBtn).toBeInTheDocument();
    userEvent.click(searchiconBtn);

    const inputText = screen.getByTestId('search-input')
    expect(inputText).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId('name-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.click(ingredientRadio);

    userEvent.type(inputText, 'Bubble & Squeak');
    expect(inputText.value).toBe('Bubble & Squeak')

    const searchBtn = screen.getByTestId('exec-search-btn')
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    setInterval(() => {
      const recipeFiltered = screen.findByText('Bubble & Squeak')
      expect(recipeFiltered).toBeInTheDocument();
      const recipeNotFiltered = screen.queryByText('Beef and Mustard Pie')
      expect(recipeNotFiltered).toBeNull();
    }, 2000)

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterRadio).toBeInTheDocument();
    userEvent.click(firstLetterRadio);

    const alertWindow = jest.spyOn(window,'alert'); 
    userEvent.click(searchBtn);

    expect(alertWindow).toHaveBeenCalledTimes(1)

    window.alert = domAlert; 
  })

  it('Alerta de receita não encontrada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);
    const firstLetter = screen.getByText('First letter');
    userEvent.click(firstLetter);
    const inputField = screen.queryByPlaceholderText(/search/i);
    userEvent.type(inputField, 'z');
    const searchButton = screen.getByRole('button', {
      name: /buscar/i
    })
    userEvent.click(searchButton);
  });

  it('Testando Categorias de buscas renderizados na Página de bebidas', async () => {
    renderWithRouter(<App />);
    const buttonDrinks = screen.getByRole('button', {
      name: /drinks/i
    })
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    const firstLetter = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);
    const inputField = screen.queryByPlaceholderText(/search/i);
    userEvent.click(firstLetter);
    userEvent.type(inputField, 'e');
    const searchButton = screen.getByRole('button', {
      name: /buscar/i
    })
    userEvent.click(searchButton);
    const eggCreamSearch = await screen.findByText(/Egg Cream/i);
    expect(eggCreamSearch).toBeInTheDocument();
  });
})