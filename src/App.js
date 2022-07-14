import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecProvider from './context/RecProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <RecProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Recipes } />
        </Switch>
      </BrowserRouter>
    </RecProvider>
  );
}

export default App;
