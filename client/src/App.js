import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'

function App() {

  return (
      <BrowserRouter>
        {/* Add Nav Bar Component Here! */}
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/forgot-password" component={FPassPage}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
