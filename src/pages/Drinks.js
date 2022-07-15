import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import contexto from '../context';

export default function Drinks(props) {
  const { history } = props;

  const cont = useContext(contexto);
  const { context } = cont;

  const { drink } = context;
  let arrayDrinks = drink;
  const max = 12;
  if (drink.length > max) {
    arrayDrinks = [];
    for (let i = 0; i < max; i += 1) {
      arrayDrinks.push(drink[i]);
    }
  }
  return (
    <div>
      <Header searchIcon="visible" title="Drinks" history={ history } />
      Profile
      {console.log(drink)}
      {
        drink && arrayDrinks.map((item, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              src={ item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              className="imageItem"
              alt=""
            />
            <p data-testid={ `${index}-card-name` }>
              { item.strDrink }
              {' '}
            </p>
          </div>
        ))
      }
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};
