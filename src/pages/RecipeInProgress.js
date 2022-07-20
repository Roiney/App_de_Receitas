import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import contexto from '../context';
import share from '../images/shareIcon.svg';
import vazio from '../images/whiteHeartIcon.svg';
import preenchido from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function RecipeInProgress(props) {
  const history = useHistory();
  const [link, setLink] = useState('');
  const [fav, setFav] = useState([]);
  const [itemFD, setItemFD] = useState('');
  const { pathname } = useLocation();
  const [save, setSave] = useState([]);
  const [disabled, setDisabled] = useState(true);
  // const [check, setCheck] = useState('');

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

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      setFav(favorites);
    } const texto = pathname.replace('/foods/', '');
    const text = texto.replace('/in-progress', '');
    setItemFD(text);
  }, []);

  const retornaIcone = () => {
    if (fav[0] === null) {
      return vazio;
    }
    const ids = fav.map((f) => f.id);
    if (ids.includes(itemFD)) {
      return preenchido;
    }
    return vazio;
  };

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
    const measure = obj
      .filter((name) => name[0].includes('strMeasure'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const array = [];
    // setCheck(ingredients.length);
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

  const favoriteRecipesFunc = () => {
    const itemAdd = {
      id: foodsInProgress[0].idMeal,
      type: 'food',
      nationality: foodsInProgress[0].strArea,
      category: foodsInProgress[0].strCategory,
      alcoholicOrNot: '',
      name: foodsInProgress[0].strMeal,
      image: foodsInProgress[0].strMealThumb,
    };

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([itemAdd]));
      setFav([itemAdd]);
    } else {
      const ids = fav.map((f) => f.id);
      console.log('ids', ids);
      console.log('item', itemFD);
      if (ids.includes(itemFD)) {
        const filtro = fav.filter((fil) => fil.id !== itemFD);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
        setFav(filtro);
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, itemAdd]));
        setFav((prevState) => [...prevState, itemAdd]);
      }
    }
  };

  useEffect(() => {
    /* const items = foodsInProgress.map((food) => (
      <ul>
        {handleIng(food)}
      </ul>
    )); */
    // console.log(foodsInProgress);
    const enabledButton = () => {
      // const obj = Object.entries(foodsInProgress);
      const checkB = document.getElementsByTagName('input');
      console.log('check', checkB.length);
      console.log('save', save.length);
      if (save.length > 0 && save.length === checkB.length) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    enabledButton();
  }, [save]);
  // const obj = Object.entries(foodsInProgress)[0];
  // const ingredients = obj
  //   .filter((name) => name[0].includes('strIngredient'))
  //   .filter((item) => item[1] !== '' && item[1] !== null);
  // console.log(ingredients);

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
    const itemAdd = {
      id: foodsInProgress[0].idMeal,
      type: 'food',
      nationality: foodsInProgress[0].strArea,
      category: foodsInProgress[0].strCategory,
      alcoholicOrNot: '',
      name: foodsInProgress[0].strMeal,
      image: foodsInProgress[0].strMealThumb,
      startTime: new Date(),
    };
    localStorage.setItem('Done-Recipes', JSON.stringify([itemAdd]));
  };

  /* const clickFav = () => (
    fav === 'Favoritar' ? setFav('Favoritou!!!') : setFav('Favoritar')); */

  return (
    <div>
      {foodsInProgress.map((food) => (
        <div key={ food.idMeal }>
          <img src={ food.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-title">{food.strMeal}</p>
          <p data-testid="recipe-category">{food.strCategory}</p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ clickLink }
          >
            <img src={ share } alt="Botão Compartilhar" />
          </button>
          {link && <p>{link}</p>}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ favoriteRecipesFunc }
            src={ retornaIcone() }
          >
            <img src={ retornaIcone() } alt="botão favoritar/desfavoritar" />
          </button>
          <ul>{handleIng(food)}</ul>
          <p data-testid="instructions">{food.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ directClick }
            disabled={ disabled }
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
