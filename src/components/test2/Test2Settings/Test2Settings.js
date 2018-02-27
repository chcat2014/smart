import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import {Link} from 'react-router-dom';

import Speed from '../../common/speed/Speed.js';

class Test2Settings extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);

        this.state = {
            speed: this.props.speed,
            complexity: this.props.complexity,
            maxNumber: this.props.maxNumber,
            isValid: true
        };
    }
    onSettingsComplete(){
        this.props.onChange(this.state);
    }

    render() {
        return (
            <div class="Test2Settings">
                <h2>Настройки</h2>
                <Speed value={this.state.speed}
                       onChange={this.onSpeedChanged}/>
                <div>
                    <RaisedButton label="Выбрать игру"
                                  containerElement={<Link to='/'/>}
                    />
                </div>
                <FloatingActionButton  onClick={this.onSettingsComplete}>
                    <Play />
                </FloatingActionButton>
            </div>
        );
    }
}


export default Test2Settings;