import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';

export default function DrinksProgress(props) {
  const cont = useContext(contexto);
  const { context } = cont;
  const { drinksInProgress, reqApiProgressDrinks } = context;

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    reqApiProgressDrinks(id);
  });

  const handleIng = (drink) => {
    const obj = Object.entries(drink);
    const ingredients = obj.filter((name) => name[0].includes('strIngredient'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    console.log('teste', ingredients);
    const measure = obj.filter((name) => name[0].includes('strMeasure'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const array = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <span className="check" data-testid={ `${i}-ingredient-step` }>
          <input type="checkbox" className="space" />
          <li>
            {`${ingredients[i][1]} - ${measure[i][1]}`}
          </li>

        </span>,
      );
    }
    return array;
  };

  return (
    <div>
      {drinksInProgress.map((drink) => (
        <div key={ drink.idDrink }>
          <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{drink.strDrink}</p>
          <p data-testid="recipe-category">{drink.strCategory}</p>
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>
          <ul>{handleIng(drink)}</ul>
          <p data-testid="instructions">{drink.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">
            Finalizar
          </button>
        </div>
      ))}
    </div>
  );
}
DrinksProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
