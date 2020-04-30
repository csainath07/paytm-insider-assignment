import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HomeRouteDetails } from './components/Home';
import { SuccessRouteDetails } from './components/Success';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route {...HomeRouteDetails} />
            <Route {...SuccessRouteDetails} />
            <Redirect path="*" to="/" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
