import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
