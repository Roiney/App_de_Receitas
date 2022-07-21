import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import iconeCompartilhar from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes(props) {
  const { history } = props;
  const { pathname } = useLocation();
  const [storage, setStorage] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const storageRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setStorage(storageRecipes);
    setOptions(storageRecipes);
    console.log(storageRecipes);
  }, []);

  const foodItemReturn = ({ index, category, nationality, tags }) => (
    <div>
      <p>{nationality}</p>
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      {tags.map((tag, i) => (
        <span data-testid={ `${i}-${tag}-horizontal-tag` } key={ i + 1 }>
          {tag}
          {' '}
        </span>
      ))}
    </div>
  );

  const drinkItemReturn = ({ alcoholicOrNot }) => <p>{alcoholicOrNot}</p>;

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

  const storageReturn = () => {
    if (options.length > 0) {
      const storageMap = options.map((item, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt="imagem"
            className="imageItem"
          />
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{item.startTime}</p>
          <button type="button" src={ iconeCompartilhar } onClick={ clickLink }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ iconeCompartilhar }
              alt="compartilhar"
              className="imageItem"
            />
          </button>
          {item.type === 'food' ? foodItemReturn(item) : drinkItemReturn(item)}
        </div>
      ));
      return storageMap;
    }
  };

  const foodFilterBtn = (filter) => {
    const filterFood = filter.filter((food) => food.type === 'food');
    setOptions(filterFood);
  };

  const drinkFilterBtn = (filter) => {
    const filterDrink = filter.filter((drink) => drink.type === 'drink');
    setOptions(filterDrink);
  };

  return (
    <div>
      <Header searchIcon="hidden" title="Done Recipes" history={ history } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setOptions(storage) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => foodFilterBtn(storage) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => drinkFilterBtn(storage) }
        >
          Drinks
        </button>
      </div>
      {storage ? storageReturn() : <p>No recipes yet</p>}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
