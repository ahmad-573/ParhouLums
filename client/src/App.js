import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'

function App() {

  return (
      <BrowserRouter>
        {/* Add Nav Bar Component Here! */}
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
