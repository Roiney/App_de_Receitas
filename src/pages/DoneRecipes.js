import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import contexto from '../context/index';
import iconeCompartilhar from '../images/iconeCompartilhar.png';

export default function DoneRecipes(props) {
  const { history } = props;
  const { doneRecipes } = useContext(contexto);

  return (
    <div>
      <Header searchIcon="hidden" title="Done Recipes" history={ history } />
      Done Recipes
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div>
        <img
          data-testid="${index}-horizontal-image"
          src={ img }
          alt="imagem"
        />
        <p
          data-testid="${index}-horizontal-top-text"
        >
          Categoria Receita
        </p>
        <p
          data-testid="${index}-horizontal-name"
        >
          Nome da Receita
        </p>
        <p
          data-testid="${index}-horizontal-done-date"
        >
          Data que foi Salvo
        </p>
        <img
          data-testid="${index}-horizontal-share-btn"
          src={ iconeCompartilhar }
          alt="compartilhar"
        />
        <p
          data-testid="${index}-${tagName}-horizontal-tag"
        >
          Tags Receita
        </p>
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
