import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import iconeCompartilhar from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes(props) {
  const { history } = props;
  const { pathname } = useLocation();
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const storageRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setStorage(storageRecipes);
    console.log(storageRecipes);
  }, []);

  const foodItemReturn = ({ index, category, nationality, tags }) => (
    <div>
      <p>{ nationality }</p>
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      { tags.map((tag, i) => (
        <span
          testid={ `${i}-${tag}-horizontal-tag` }
          key={ i + 1 }
        >
          { tag }
          {' '}
        </span>))}
    </div>
  );

  const drinkItemReturn = ({ alcoholicOrNot }) => (<p>{alcoholicOrNot}</p>);

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
    if (storage.length > 0) {
      const storageMap = storage.map(
        (item, index) => (
          <div key={ index }>
            <Link
              to={ `/${item.type}s/${item.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt="imagem"
                className="imageItem"
              />
            </Link>
            <Link
              to={ `/${item.type}s/${item.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.startTime}</p>
            <button
              type="button"
              src={ iconeCompartilhar }
              onClick={ clickLink }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ iconeCompartilhar }
                alt="compartilhar"
                className="imageItem"
              />
            </button>
            { item.type === 'food'
              ? foodItemReturn(item)
              : drinkItemReturn(item)}
          </div>
        ),
      );
      return storageMap;
    }
  };

  return (
    <div>
      <Header searchIcon="hidden" title="Done Recipes" history={ history } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
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
