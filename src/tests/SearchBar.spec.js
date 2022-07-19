import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando página Foods', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Teste requisição buscando pelo nome', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata',
    );
  });

  it('Testando se faz requisição corretamente buscando pelo ingrediente', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
    );
  });

  it('Testando se faz requisição corretamente buscando pela primeira letra', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
    );
  });

  it('Testando se exibe alerta ao digitar mais de uma letra', async () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(alert).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    );
  });
});

describe('Testando página drinks', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando se faz requisição corretamente buscando pelo nome', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'margarita');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
    );
  });

  it('Testando se faz requisição corretamente buscando pelo ingrediente', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'Gin');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin',
    );
  });

  it('Testando se faz requisição corretamente buscando pela primeira letra', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');


    userEvent.type(inputSearch, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
    );
  });

  test('verificando filtros', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')
    const searchLupa = screen.getByTestId("search-top-btn");
    userEvent.click(searchLupa);

    const inputText = screen.getByTestId('search-input');
    expect(inputText).toBeInTheDocument();

    userEvent.type(inputText, 'Onion');
    expect(inputText.value).toBe('Onion');

    const ingredientRadio = screen.getByTestId("ingredient-search-radio");
    userEvent.click(ingredientRadio);

    const searchBtn = screen.getByTestId('exec-search-btn')
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const recipeFiltered = await screen.findByText('Bubble & Squeak')
      expect(recipeFiltered).toBeInTheDocument();

      history.push('/drinks');

      const searchLupa1 = screen.getByTestId("search-top-btn");
      expect(searchLupa1).toBeInTheDocument();
      // userEvent.click(searchLupa1);

    const inputText1 = screen.getByTestId('search-input');
    expect(inputText1).toBeInTheDocument();

    userEvent.clear(inputText1);
    userEvent.type(inputText1, 'Light Rum');
    expect(inputText1.value).toBe('Light Rum');

    const ingredientRadio1 = screen.getByTestId("ingredient-search-radio");
    userEvent.click(ingredientRadio1);

    const searchBtn1 = screen.getByTestId('exec-search-btn')
    expect(searchBtn1).toBeInTheDocument();
    userEvent.click(searchBtn1);

    const recipeFiltered1 = await screen.findByText('155 Belmont')
      expect(recipeFiltered1).toBeInTheDocument();

  });

  it('Testando se exibe alerta ao digitar mais de uma letra', async () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(alert).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    );
  });

});