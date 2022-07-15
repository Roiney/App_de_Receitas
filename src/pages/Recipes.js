import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import contexto from '../context';

export default function Recipes(props) {
  const { history } = props;

  const cont = useContext(contexto);
  const { context } = cont;

  const { food } = context;
  console.log(food);
  let arrayFood = food;
  const max = 12;
  if (food.length > max) {
    arrayFood = [];
    for (let i = 0; i < max; i += 1) {
      arrayFood.push(food[i]);
    }
  }

  const buttonToDrinks = () => {
    history.push('/drinks');
  };

  return (
    <div>
      <button type="button" onClick={ buttonToDrinks }>Drinks</button>
      <Header searchIcon="visible" title="Foods" history={ history } />
      {
        food && arrayFood.map((item, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              src={ item.strMealThumb }
              data-testid={ `${index}-card-img` }
              className="imageItem"
              alt=""
            />
            <p data-testid={ `${index}-card-name` }>
              { item.strMeal }
              {' '}
            </p>
          </div>
        ))
      }
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
