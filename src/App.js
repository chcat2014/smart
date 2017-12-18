import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'

import './App.css';

import Home from './components/home/Home';
import Test1 from './components/test1/Test1';
import Test2 from './components/test1/Test1';

class App extends Component {
  render() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/test1' component={Test1}/>
                <Route path='/test2' component={Test2}/>
            </Switch>
        </HashRouter>
    );
  }
}

export default App;
