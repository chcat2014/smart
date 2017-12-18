import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from '../../static/logo.svg';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. AAA
        </p>
          <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/test1'>Test1</Link></li>
              <li><Link to='/test2'>Test2</Link></li>
          </ul>
      </div>
    );
  }
}

export default Home;
