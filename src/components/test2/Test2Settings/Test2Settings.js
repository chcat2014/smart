import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import {Link} from 'react-router-dom';

import './Test2Settings.css';
import Speed from '../../common/speed/Speed.js';

class Test2Settings extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);
        this.onSpeedChanged = this.onSpeedChanged.bind(this);
        this.onComplexityChanged = this.onComplexityChanged.bind(this);
        this.onMaxNumberChanged = this.onMaxNumberChanged.bind(this);

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

    onSpeedChanged(speed) {
        this.setState({
            speed: speed
        });
        this.validate(speed);
    }

    onComplexityChanged(e, value) {
        this.setState({complexity: value});
    }

    onMaxNumberChanged(e, key, payload) {
        const change = {maxNumber: payload};
        this.setState(change);
    }

    isSpeedValid(speed) {
        return !isNaN(speed) && speed >= 0.1 && speed <= 10
    }

    validate(speed) {
        const _speed = speed !== undefined ? speed : this.state.speed;
        const isValid = this.isSpeedValid(_speed / 1000);
        if (this.state.isValid !== isValid) {
            this.setState({
                isValid: isValid
            });
        }
    }

    componentDidMount() {
        this.validate();
    }

    render() {
        return (
            <div className="Test2Settings">
                <h2>Настройки</h2>
                <Speed value={this.state.speed}
                       onChange={this.onSpeedChanged}/>
                <Paper className="setingsPaper" zDepth={1} rounded={false}>
                    <h4>Сложность</h4>
                    <div className="flexContainer">
                        <div style={{width: 330, marginTop: 15}}>
                            <RadioButtonGroup name="complexity"
                                              onChange={this.onComplexityChanged}
                                              valueSelected={this.state.complexity}>
                                <RadioButton
                                    value={0}
                                    label="Новичок, цифры изучены только до "
                                />
                                <RadioButton
                                    value={1}
                                    label="Только десятки"
                                />
                                <RadioButton
                                    value={2}
                                    label="Двухзначные числа до 100"
                                />
                                <RadioButton
                                    value={3}
                                    label="Только сотни"
                                />
                                <RadioButton
                                    value={4}
                                    label="Трехзначные числа до 1000"
                                />
                            </RadioButtonGroup>
                        </div>
                        <div style={{width: 50}}>
                            <SelectField value={this.state.maxNumber} style={{width: 50}}
                                         autoWidth={true} onChange={this.onMaxNumberChanged}
                                         disabled={this.state.complexity !== 0}>
                                <MenuItem value={3} primaryText="3" />
                                <MenuItem value={4} primaryText="4" />
                                <MenuItem value={5} primaryText="5" />
                                <MenuItem value={6} primaryText="6" />
                                <MenuItem value={7} primaryText="7" />
                                <MenuItem value={8} primaryText="8" />
                                <MenuItem value={9} primaryText="9" />
                            </SelectField>
                        </div>
                    </div>
                </Paper>
                <div className="Test2Settings_Actions">
                    <div>
                        <RaisedButton label="Выбрать игру" containerElement={<Link to='/'/>} />
                    </div>
                    <div>
                        <FloatingActionButton  onClick={this.onSettingsComplete} disabled={!this.state.isValid}>
                            <Play />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }
}


export default Test2Settings;