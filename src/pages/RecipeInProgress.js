import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import contexto from '../context';

const copy = require('clipboard-copy');

export default function RecipeInProgress(props) {
  const history = useHistory();
  const [link, setLink] = useState('');
  const [fav, setFav] = useState('Favoritar');
  const { pathname } = useLocation();
  // const [save, setSave] = useState([]);

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
  }, []);

  document.querySelectorAll('.space').forEach((item) => {
    const {
      match: {
        params: { id },
      },
    } = props;
    item.addEventListener('change', (e) => {
      const span = e.target.parentNode.querySelector('.ing');
      span.style.textDecoration = e.target.checked ? 'line-through' : '';
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          meals: {
            [id]: e.target.name,
          },
        }),
      );
      JSON.parse(localStorage.getItem('inProgressRecipes'));
    });
  });

  const handleIng = (food) => {
    const obj = Object.entries(food);
    const ingredients = obj
      .filter((name) => name[0].includes('strIngredient'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const measure = obj
      .filter((name) => name[0].includes('strMeasure'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const array = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <span className="check" data-testid={ `${i}-ingredient-step` }>
          <input
            type="checkbox"
            name={ ingredients[i][1] }
            className="space"
          />
          <li className="ing">{`${ingredients[i][1]} - ${measure[i][1]}`}</li>
        </span>,
      );
    }
    return array;
  };

  const clickLink = () => {
    setTimeout(() => {
      setLink('');
    }, +'3000');
    setLink('Link copied!');
    copy(
      `http://localhost:3000/${pathname.split('/')[1]}/${
        pathname.split('/')[2]
      }`,
    );
  };

  const directClick = () => {
    history.push('/done-recipes');
  };

  const clickFav = () => (
    fav === 'Favoritar' ? setFav('Favoritou!!!') : setFav('Favoritar'));

  return (
    <div>
      {foodsInProgress.map((food) => (
        <div key={ food.idMeal }>
          <img src={ food.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{food.strMeal}</p>
          <p data-testid="recipe-category">{food.strCategory}</p>
          <button type="button" data-testid="share-btn" onClick={ clickLink }>
            Compartilhar
          </button>
          {link && <p>{link}</p>}
          <button type="button" data-testid="favorite-btn" onClick={ clickFav }>
            {fav || 'Favoritar'}
          </button>
          <ul>{handleIng(food)}</ul>
          <p data-testid="instructions">{food.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn" onClick={ directClick }>
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
