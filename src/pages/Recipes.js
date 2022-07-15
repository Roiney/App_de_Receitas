import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import contexto from '../context';

export default function Recipes(props) {
  const { history } = props;

  const cont = useContext(contexto);
  const { context } = cont;

  const { food, reqApiFoods, foodsIn12 } = context;

  useEffect(() => {
    reqApiFoods();
  }, []);

  // Outra maneira de fazer o .map mas foi preferido a outra maneira!!!
  /* const reqToMap = (array) => array.slice(0, +'12').map((item, index) => (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
      <img
        data-testid={ `${index}-card-img` }
        src={ item.strMealThumb }
        alt=""
        className="imageItem"
      />
    </div>
  )); */

  return (
    <div>
      <Header searchIcon="visible" title="Foods" history={ history } />
      {/* { food.length ? reqToMap(food) : reqToMap(foodsIn12) }
      { reqToMap(food.length ? food : foodsIn12) } */}
      {(food.length ? food : foodsIn12).slice(0, +'12').map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt=""
            className="imageItem"
          />
        </div>
      ))}
      <Footer history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
