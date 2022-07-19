import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';
import './Styles/FoodId.css';

export default function FoodsId(props) {
  const cont = useContext(contexto);
  const { context } = cont;
  const { reqApiFoodsID, foodId, reqApiDrinks, drinksIn12 } = context;

  useEffect(() => {
    reqApiDrinks();
  });

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    reqApiFoodsID(id);
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
        <li data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${ingredients[i][1]} - ${measure[i][1]}`}
        </li>,
      );
    }
    return array;
  };

  return (
    <div>
      Foods Id
      {foodId.map((food) => (
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
      ))}
      <div>
        <h2>Recomended</h2>
        <div className="parent">
          {drinksIn12.slice(0, +'6').map((item, index) => (
            <div data-testid={ `${index}-recomendation-card` } key={ index }>
              <p data-testid={ `${index}-recomendation-title` }>{ item.strDrink }</p>
              <img
                src={ item.strDrinkThumb }
                alt=""
                className="imageItem-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

FoodsId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
