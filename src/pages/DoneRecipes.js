import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import iconeCompartilhar from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes(props) {
  const { history } = props;
  const [storage, setStorage] = useState([]);
  const [link, setLink] = useState('');

  useEffect(() => {
    const storageRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setStorage(storageRecipes);
    console.log(storageRecipes);
  }, []);

  const foodItemReturn = (item, index) => (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${item.nationality} - ${item.category}`}
      </p>
      { item.tags.map((tag, i) => (
        <span
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ i + 1 }
        >
          { tag }
        </span>))}
    </div>
  );

  const drinkItemReturn = (item, index) => (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</p>
    </div>
  );

  const clickLink = (type, id) => {
    setTimeout(() => {
      setLink('');
    }, +'3000');
    setLink('Link copied!');
    copy(
      `http://localhost:3000/${type}s/${id}`,
    );
  };

  const storageReturn = () => {
    if (storage.length > 0) {
      const storageMap = storage.map(
        (item, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt="imagem"
              className="imageItem"
            />
            <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {item.doneDate}
            </p>
            { item.type === 'food'
              ? foodItemReturn(item, index)
              : drinkItemReturn(item, index)}
            <button
              type="button"
              src={ iconeCompartilhar }
              onClick={ () => clickLink(item.type, item.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ iconeCompartilhar }
                alt="compartilhar"
                className="imageItem"
              />
            </button>
            {link && <p>{link}</p>}
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
