import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Recipes(props) {
  const { history } = props;
  return (
    <div>
      <Header searchIcon="visible" title="Profile" history={ history } />
      Tela Principal de comidas!!!
      <Footer history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.func.isRequired,
};
