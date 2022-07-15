import React from 'react';
import './Styles/Footer.css';

function Footer(props) {
  const { history } = props;

  const drinkRedirect = () => {
    history.push('/drinks');
  };

  const foodRedirect = () => {
    history.push('/foods');
  };

  return (
    <div className="footer">
      <footer data-testid="footer" htmlFor="drink">

        <button
          type="button"
          aria-label="drinks"
          className="iconDrink"
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
          onClick={ drinkRedirect }
        />
        <button
          type="button"
          aria-label="foods"
          className="iconFoods"
          src="../images/mealIcon.svg"
          data-testid="food-bottom-btn"
          onClick={ foodRedirect }
        />
      </footer>
    </div>
  );
}

export default Footer;
