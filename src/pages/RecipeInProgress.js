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
  const [save, setSave] = useState([]);

  const cont = useContext(contexto);
  const { context } = cont;

  const { reqApiProgressFoods, foodsInProgress } = context;

  useEffect(() => {
    const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItens === null) {
      setSave([getItens]);
    } else {
      setSave(getItens);
    }
    const {
      match: {
        params: { id },
      },
    } = props;
    reqApiProgressFoods(id);
  }, []);

  const handleClass = (item) => {
    const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItens !== null && getItens.includes(item)) {
      return 'through';
    }
  };

  const handleCheck = (item) => {
    if (save !== null && save.includes(item)) {
      return true;
    }
  };

  const handleChange = (e) => {
    // localStorage.setItem('inProgressRecipes', JSON.stringify());
    if (e.target.checked) {
      setSave((prevState) => [...prevState, e.target.name]);
      const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getItens === null) {
        localStorage.setItem('inProgressRecipes', JSON.stringify([e.target.name]));
      } else {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify([...getItens, e.target.name]),
        );
      }
      const span = e.target.parentNode.querySelector('.ing');
      span.style.textDecoration = 'line-through';
    } else {
      const span = e.target.parentNode.querySelector('.ing');
      span.style.textDecoration = 'none';
      const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newItens = getItens.filter((item) => item !== e.target.name);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newItens));
      setSave(newItens);
    }
  };

  const handleIng = (food) => {
    const obj = Object.entries(food);
    const ingredients = obj
      .filter((name) => name[0].includes('strIngredient'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    console.log(ingredients);
    // setSave(ingredients);
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
            onChange={ handleChange }
            checked={ handleCheck(ingredients[i][1]) }
          />
          <li
            className={ `ing ${handleClass(ingredients[i][1])}` }
            // style={ { textDecoration: 'line-through' } }
          >
            {`${ingredients[i][1]} - ${measure[i][1]}`}
          </li>
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
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ directClick }
          >
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
