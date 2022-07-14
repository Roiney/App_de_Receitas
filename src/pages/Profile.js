import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Profile(props) {
  const { history } = props;
  return (
    <div>
      <Header searchIcon="hidden" title="Profile" history={ history } />
      Profile
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.func.isRequired,
};
