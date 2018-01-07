import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Exposure from 'material-ui/svg-icons/image/exposure-plus-1';
import Camera from 'material-ui/svg-icons/image/camera';

import './Home.css'
import logo from '../../static/logo.svg';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    <h1>Игры для абакуса</h1>
                </header>
                <div className="Head-text">
                <h2 className="Home-intro">
                    Добро пожаловать
                </h2>
                <p>Выберите одну из этих игр</p>
                <Paper zDepth={1} rounded={false} style={{width: 350}}>
                    <Menu style={{width: 300}}>
                         <MenuItem  leftIcon={<Exposure />} primaryText="Цифрочки" containerElement={<Link to='/test1'/>}/>
                        <MenuItem  leftIcon={<Camera />} primaryText="Test2" containerElement={<Link to='/test2'/>}/>
                    </Menu>
                </Paper>
            </div>
            </div>
        );
    }
}

export default Home;
