import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo700, indigo200} from 'material-ui/styles/colors';

import './App.css';

import Home from './components/home/Home';
import Test1 from './components/test1/Test1';
import Test2 from './components/test2/Test2';

class App extends Component {
  render() {
      const muiTheme = getMuiTheme({
          fontFamily: 'Helvetica, sans-serif',
          palette: {
              primaryColor: indigo700
          },
          raisedButton: {
              primaryColor: indigo700
          },
          floatingActionButton: {
              color: indigo700,
              secondaryColor: indigo700,
          },
          toggle: {
              thumbOnColor: indigo700,
              trackOnColor: indigo200
          },
          checkbox: {
              checkedColor: indigo700
          },
          radioButton: {
              checkedColor: indigo700
          },
          textField: {
              floatingLabelColor: indigo700,
              focusColor: indigo700
          }
      });
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/test1' component={Test1}/>
                    <Route path='/test2' component={Test2}/>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
  }
}

export default App;
