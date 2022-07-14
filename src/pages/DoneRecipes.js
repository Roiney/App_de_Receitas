import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function DoneRecipes(props) {
  const { history } = props;
  return (
    <div>
      <Header searchIcon="hidden" title="Done Recipes" history={ history } />
      Done Recipes
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
