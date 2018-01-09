import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import theme from './Theme';
import './App.css';

import Home from './components/home/Home';
import Test1 from './components/test1/Test1';
import Test2 from './components/test2/Test2';

class App extends Component {
    render() {
        const muiTheme = getMuiTheme(theme);
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
