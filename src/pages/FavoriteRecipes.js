import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function FavoriteRecipes(props) {
  const { history } = props;
  return (
    <div>
      <Header searchIcon="hidden" title="Favorite Recipes" history={ history } />
      Favorite Recipes
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
