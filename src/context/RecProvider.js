import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contexto from './index';

// const { cockTailDb } = data;

export default function RecProvider({ children }) {
  // const [login, setLogin] = useState('');
  const [search, setSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [food, setFood] = useState(['vazio']);
  const [drink, setDrink] = useState(['vazio']);

  const setFetch = (apiReq) => {
    console.log(apiReq);
    console.log(apiReq);
    if (Object.keys(apiReq).includes('drinks')) {
      setDrink(apiReq.drinks);
    } else if (Object.keys(apiReq).includes('meals')) {
      console.log(apiReq.meals);
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
