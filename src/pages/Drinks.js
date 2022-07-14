import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Drinks(props) {
  const { history } = props;
  return (
    <div>
      <Header searchIcon="visible" title="Profile" history={ history } />
      Profile
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};
