import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import iconeCompartilhar from '../images/iconeCompartilhar.png';

export default function DoneRecipes(props) {
  const { history } = props;
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const storageRecipes = JSON.parse(localStorage.getItem('Done-Recipes'));
    setStorage(storageRecipes);
  }, []);
  const storageReturn = () => {
    if (storage.length > 0) {
      const storageMap = storage.map((item, index) => (
        <div>
          <img
            data-testid={`${index}-horizontal-image`}
            src={item.image}
            alt="imagem"
          />
          <p data-testid={`${index}-horizontal-top-text`}>{item.category}</p>
          <p data-testid={`${index}-horizontal-name`}>{item.name}</p>
          <p data-testid={`${index}-horizontal-done-date`}>{item.startTime}</p>
          <img
            data-testid={`${index}-horizontal-share-btn`}
            src={iconeCompartilhar}
            alt="compartilhar"
          />
          <p data-testid={`${index}-${item.type}-horizontal-tag`}>
            {item.type}
          </p>
        </div>
      ));
      return storageMap;
    }
  };

  return (
    <div>
      <Header searchIcon="hidden" title="Done Recipes" history={ history } />
      Done Recipes
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
      {storageReturn()}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
