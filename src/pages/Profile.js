import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile(props) {
  const { history } = props;
  return (
    <div>
      <Header searchIcon="hidden" title="Profile" history={ history } />
      Profile
      <Footer history={ history }/>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.func.isRequired,
};
