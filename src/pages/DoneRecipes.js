import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import iconeCompartilhar from '../images/iconeCompartilhar.png';

export default function DoneRecipes(props) {
  const { history } = props;
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const storageRecipes = localStorage.getItem('doneRecipes');
    setStorage(storageRecipes);
    console.log(storageRecipes);
  }, []);

  const tags = () => {
    const tag = storage.map((item) => item.tags.split(' ')[0]);
    return tag;
  };

  const storageReturn = () => {
    if (storage.length > 0) {
      const storageMap = storage.map((item, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt="imagem"
            className="imageItem"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{item.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{item.startTime}</p>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ iconeCompartilhar }
            alt="compartilhar"
            className="imageItem"
          />
          <p data-testid={ `${index}-${tags()}-horizontal-tag` }>
            { item.tags }
          </p>
        </div>
      ));
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
      { storage ? storageReturn() : <p>No recipes yet</p> }
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
