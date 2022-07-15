import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();
  const buttonBackFoods = () => {
    history.push('/foods');
  };
  return (
    <div>
      <button type="button" onClick={ buttonBackFoods }>Tela principal</button>
      <Header searchIcon="hidden" title="Profile" history={ history } />
      Profile
      <Footer history={ history } />
    </div>
  );
}
