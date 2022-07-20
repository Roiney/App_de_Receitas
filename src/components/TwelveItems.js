import React from 'react';
import PropTypes from 'prop-types';

export default function TwelveItems(props) {
  const { drinkId, foodId, type } = props;

  const handleIng = (x) => {
    const obj = Object.entries(x);
    const ingredients = obj
      .filter((name) => name[0].includes('strIngredient'))
      .filter((item) => item[1] !== '' && item[1] !== null);
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

  const drinkFunc = () => drinkId.map((drink, index) => (
    <div key={ index }>
      <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
      <p data-testid="recipe-title">{drink.strDrink}</p>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      <ul>{handleIng(drink)}</ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <iframe
        data-testid="video"
        title="vídeo"
        width="420"
        height="345"
        src={ drink.strYoutube }
      >
        {' '}
        Vídeo
        {' '}
      </iframe>
    </div>
  ));

  const foodFunc = () => foodId.map((food) => (
    <div key={ food.idMeal }>
      <img src={ food.strMealThumb } alt="" data-testid="recipe-photo" />
      <p data-testid="recipe-title">{food.strMeal}</p>
      <p data-testid="recipe-category">{food.strCategory}</p>
      <ul>{handleIng(food)}</ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <iframe
        data-testid="video"
        title="vídeo"
        width="420"
        height="345"
        src={ food.strYoutube }
      >
        {' '}
        Vídeo
        {' '}
      </iframe>
    </div>
  ));

  return (
    <div>
      {type === 'food'
        ? foodFunc()
        : drinkFunc()}
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
    </div>
  );
}

TwelveItems.propTypes = {
  drinkId: PropTypes.string.isRequired,
  foodId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
