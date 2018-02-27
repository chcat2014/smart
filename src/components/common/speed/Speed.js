import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import './Speed.css';

class Speed extends Component {
    constructor(props) {
        super(props);
        this.onSpeedChanged = this.onSpeedChanged.bind(this);
        this.onSpeedClicked = this.onSpeedClicked.bind(this);
        this.isSpeedValid = this.isSpeedValid.bind(this);
        this.state = {
            speed: this.props.value,
        }
    }
    onSpeedChanged(e) {
        let speed = parseFloat(e.currentTarget.value, 10);
        let isCorrect = this.isSpeedValid(speed);
        const msSpeed = speed * 1000;

        this.setState({
            speed: msSpeed,
            speedErrorText: isCorrect ? undefined : 'Число от 0.1 до 10'
        });
        this.props.onChange(msSpeed);
    }
    isSpeedValid(speed) {
        return !isNaN(speed) && speed >= 0.1 && speed <= 10
    }

    onSpeedClicked(e) {
        const msSpeed = parseInt(e.currentTarget.value, 10);

        this.setState({
            speed: msSpeed,
            speedErrorText: undefined
        });
        this.props.onChange(msSpeed);
    }

    render() {
        const speeds = [
            {id: 1, name: 'Медленно', value: 4000},
            {id: 2, name: 'Средне', value: 1500},
            {id: 3, name: 'Быстро', value: 1000},
            {id: 4, name: 'Очень быстро', value: 600},
        ];

        const contentSpeed = speeds.map((speed) =>
            <span key={speed.id}>
            <RaisedButton label={speed.name}
                          onClick={this.onSpeedClicked}
                          value={speed.value}
                          primary={this.state.speed === speed.value}
                          className="Speed_Button"/>
            </span>
        );

        return (
            <Paper className="setingsPaper" zDepth={1} rounded={false}>
                <h4>Скорость</h4>
                <div className="Speed_SpeedContainer">
                    <div className="Speed_SpeedButtons">{contentSpeed}</div>
                    <div className="Speed_SpeedField">
                        <TextField
                            name="inpSpeed"
                            id="inpSpeed"
                            type="number"
                            step="0.1"
                            value={this.state.speed ? this.state.speed / 1000 : ''}
                            errorText={this.state.speedErrorText}
                            min="0.3"
                            max="10"
                            required
                            onChange={this.onSpeedChanged}
                            fullWidth={true}
                            floatingLabelText="Секунды"
                        />
                    </div>
                </div>
            </Paper>

        )
    }
}



export default Speed;