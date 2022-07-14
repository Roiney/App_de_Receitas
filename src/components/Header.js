import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';

// necessário passar o history como props para o componente header
export default function Header(props) {
  const { history, title, searchIcon } = props;

  const context = useContext(contexto);
  console.log(context);

  const [search, setSearch] = useState(false);

  const ProfileRedirect = () => {
    history.push('/profile');
  };

  const showSearchInput = () => {
    if (search) {
      return (
        <input
          type="text"
          data-testid="search-input"
        />
      );
    } return null;
  };

  const showSearchButton = () => (
    <button
      type="button"
      data-testid="search-top-btn"
      onClick={ () => setSearch(!search) }
    >
      <img src="src/images/searchIcon.svg" alt="icon-search" />
    </button>
  );

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ ProfileRedirect }
      >
        <img src="src/images/profileIcon.svg" alt="icon-profile" />
      </button>
      {
        searchIcon === 'visible'
          ? showSearchButton()
          : null
      }
      {
        showSearchInput()
      }
      <h1 data-testid="page-title">
        { title }
      </h1>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};
