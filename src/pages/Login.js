import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const validateEmail = /\S+@\S+\.\S+/;
  const MIN_LENGTH_PASSWORD = 7;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  // https://pt.stackoverflow.com/questions/399129/localstorage-salvar-alguns-campos
  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/foods');
  };

  return (
    <main>
      <h1>App de Receitas</h1>
      <form>
        <input
          type="email"
          name="email"
          value={ user.email }
          data-testid="email-input"
          onChange={ handleChange }
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={ user.password }
          data-testid="password-input"
          onChange={ handleChange }
          placeholder="Password"
        />
        <button
          type="button"
          disabled={
            user.password.length < MIN_LENGTH_PASSWORD
            || !validateEmail.test(user.email)
          }
          data-testid="login-submit-btn"
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </main>
  );
}
