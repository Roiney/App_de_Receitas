import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import contexto from '../context';

export default function Drinks(props) {
  const { history } = props;

  const cont = useContext(contexto);
  const { context } = cont;

  const { drink, reqApiDrinks, drinksIn12 } = context;

  useEffect(() => {
    reqApiDrinks();
  });

  return (
    <div>
      <Header searchIcon="visible" title="Drinks" history={ history } />
      Profile
      {(drink.length ? drink : drinksIn12).slice(0, +'12').map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            alt=""
            className="imageItem"
          />
        </div>
      ))}
      <Footer history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};
