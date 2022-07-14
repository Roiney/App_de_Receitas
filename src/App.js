import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecProvider from './context/RecProvider';
import Login from './pages/Login';

function App() {
  return (
    <RecProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </RecProvider>
  );
}

export default App;
