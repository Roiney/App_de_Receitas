import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contexto from './index';

// const { cockTailDb } = data;

export default function RecProvider({ children }) {
  // const [login, setLogin] = useState('');
  const [search, setSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [foodsIn12, setFoodsIn12] = useState([]);
  const [drinksIn12, setDrinksIn12] = useState([]);
  const [btnFoods, setBtnFoods] = useState([]);
  const [btnDrinks, setBtnDrinks] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterCategoryDrink, setFilterCategoryDrink] = useState([]);

  const reqApiCategoryDrink = async (category) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const result = await fetch(url);
    const data = await result.json();
    setFilterCategoryDrink(data.drinks);
    console.log((data.drinks).slice(0, +'12'));
  };

  const reqApiCategory = async (category) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const result = await fetch(url);
    const data = await result.json();
    setFilterCategory(data.meals);
    console.log((data.meals).slice(0, +'12'));
  };

  const resetFilters = () => {
    setFilterCategory([]);
  };

  const reqApiFoods = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const result = await fetch(url);
    const data = await result.json();
    setFoodsIn12(data.meals);
  };

  const reqApiDrinks = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const result = await fetch(url);
    const data = await result.json();
    setDrinksIn12(data.drinks);
    console.log(drinksIn12);
  };

  const reqApiBtnFoods = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const result = await fetch(url);
    const data = await result.json();
    setBtnFoods(data.meals);
  };

  const reqApiBtnDrinks = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const result = await fetch(url);
    const data = await result.json();
    setBtnDrinks(data.drinks);
    console.log(btnDrinks);
  };

  const setFetch = (apiReq) => {
    if (Object.keys(apiReq).includes('drinks')) {
      setDrink(apiReq.drinks);
    } else if (Object.keys(apiReq).includes('meals')) {
      setFood(apiReq.meals);
    }
  };

  const sendInputSearch = (e) => {
    setInputSearch(e);
  };

  const context = {
    food,
    drink,
    search,
    setSearch,
    inputSearch,
    setFetch,
    sendInputSearch,
    reqApiFoods,
    foodsIn12,
    drinksIn12,
    reqApiDrinks,
    btnFoods,
    reqApiBtnFoods,
    btnDrinks,
    reqApiBtnDrinks,
    filterCategory,
    reqApiCategory,
    filterCategoryDrink,
    reqApiCategoryDrink,
    setFilterCategoryDrink,
    setFilterCategory,
    resetFilters,
  };

  return (
    <contexto.Provider value={ { context } }>
      {children}
    </contexto.Provider>
  );
}

RecProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
