import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Play from 'material-ui/svg-icons/av/play-arrow';

import Speed from '../../common/speed/Speed.js';

class Test2Settings extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);
    }
    onSettingsComplete(){
        this.props.onChange();
    }

    render() {
        return (
            <div>
                <p>Настройки</p>
                <div class="Test2Settings">Sett</div>
                <Speed value={this.props.speed}
                       onChange={this.onSpeedChanged}/>
                <FloatingActionButton  onClick={this.onSettingsComplete}>
                    <Play />
                </FloatingActionButton>
            </div>
        );
    }
}


export default Test2Settings;