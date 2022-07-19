import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';

export default function DrinksId(props) {
  const cont = useContext(contexto);
  const { context } = cont;
  const { reqApiDrinksID, drinkId, reqApiFoods, foodsIn12 } = context;

  useEffect(() => {
    reqApiFoods();
  }, []);

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    reqApiDrinksID(id);
  }, []);

  const handleIng = (drink) => {
    const obj = Object.entries(drink);
    console.log(obj);
    const ingredients = obj
      .filter((name) => name[0].includes('strIngredient'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    console.log('teste', ingredients);
    const measure = obj
      .filter((name) => name[0].includes('strMeasure'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const array = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <li data-testid={ `${i}-ingredient-name-and-measure` }>
          <span>{ingredients[i][1]}</span>
          <span>
            {measure[i] && ` - ${measure[i][1]}`}
          </span>
        </li>,
      );
    }
    return array;
  };

  return (
    <div>
      {drinkId.map((drink) => (
        <div key={ drink.strDrink }>
          <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{drink.strDrink}</p>
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          <ul>{handleIng(drink)}</ul>
          <p data-testid="instructions">{drink.strInstructions}</p>
        </div>
      ))}
      <h2>Recomended</h2>
      <div className="parent">
        {foodsIn12.slice(0, +'6').map((item, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
            className="carousel"
          >
            <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
            <img src={ item.strMealThumb } alt="" className="imageItem" />
          </div>
        ))}
      </div>
    </div>
  );
}

DrinksId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
