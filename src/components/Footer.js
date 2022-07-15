import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  const { history } = props;

  const drinkRedirect = () => {
    history.push('/drinks');
  };

  const foodRedirect = () => {
    history.push('/foods');
  };

  return (
    <div>
      <footer data-testid="footer" htmlFor="drink">

        <button type="button" data-testid="drinks-bottom-btn" onClick={ drinkRedirect }>
          {' '}
          <img src="../images/drinkIcon.svg" />
        </button>
        <button type="button" data-testid="food-bottom-btn" onClick={ foodRedirect }>
          {' '}
          <img src="../images/mealIcon.svg" />
        </button>

      </footer>
    </div>
  );
}

export default Footer;
