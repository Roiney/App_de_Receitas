import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';

export default function RecipeInProgress(props) {
  // const [checkbox, setCheckbox] = useState(false);

  const cont = useContext(contexto);
  const { context } = cont;

  const { reqApiProgressFoods, foodsInProgress } = context;

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    reqApiProgressFoods(id);
  });

  const handleIng = (food) => {
    // console.log(food);
    const obj = Object.entries(food);
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
        <span className="check" data-testid={ `${i}-ingredient-step` }>
          <input
            type="checkbox"
            className="space"
          />
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
      {foodsInProgress.map((food) => (
        <div key={ food.idMeal }>
          <img src={ food.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{food.strMeal}</p>
          <p data-testid="recipe-category">{food.strCategory}</p>
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>
          <ul>{handleIng(food)}</ul>
          <p data-testid="instructions">{food.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">
            Finalizar
          </button>
        </div>
      ))}
    </div>
  );
}
RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
