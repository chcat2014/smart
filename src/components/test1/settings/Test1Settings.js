import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import './Test1Settings.css';
import Speed from '../../common/speed/Speed.js';

class Test1Settings extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);
        this.onSpeedChanged = this.onSpeedChanged.bind(this);
        this.onComplexityChanged = this.onComplexityChanged.bind(this);
        this.onMinDigitsChanged = this.onMinDigitsChanged.bind(this);
        this.onMaxDigitsChanged = this.onMaxDigitsChanged.bind(this);
        this.onCheckAnswersChanged = this.onCheckAnswersChanged.bind(this);
        this.onSound = this.onSound.bind(this);
        this.onMaxNumberChanged = this.onMaxNumberChanged.bind(this);
        this.onSumChanged = this.onSumChanged.bind(this);
        this.state = {
          speed: this.props.speed,
          complexity: this.props.complexity,
          minDigits: this.props.minDigits,
          maxDigits: this.props.maxDigits,
          checkAnswers: this.props.checkAnswers,
          maxNumber: this.props.maxNumber,
          sum: this.props.sum,
          sound: this.props.sound,
          speedErrorText: undefined,
          sumErrorText: undefined,
          isValid: true,
          isSoundEnable: this.props.maxDigits === 1 && this.props.speed >= 1000
        };
    }

    onSettingsComplete() {
        this.props.onComplete(this.state);
    }

    onSpeedChanged(speed) {
        let sound = this.state.sound;
        if (speed < 1000) {
          sound = false;
        }

        this.setState({
          speed: speed,
          sound: sound,
          isSoundEnable: this.state.maxDigits === 1 && speed >= 1000,
        });
        this.validate(speed);
    }

    onComplexityChanged(e, value) {
        this.setState({complexity: value});
    }

    onMinDigitsChanged(e, key, payload) {
      const change = {
        minDigits: payload
      };
      if (this.state.maxDigits < payload) {
        if (payload > 1) {
          change.sound = false;
          change.isSoundEnable = false;
        }
        change.maxDigits = payload;
      }
      this.setState(change);
    }

    onMaxDigitsChanged(e, key, payload) {
      const change = {
        maxDigits: payload,
        isSoundEnable: payload === 1 && this.state.speed >= 1000
      };
      if (payload > 1) {
        change.sound = false;
      }

      this.setState(change);
    }

    onMaxNumberChanged(e, key, payload) {
      const change = {maxNumber: payload};
      this.setState(change);
    }

    onSumChanged(e) {
        let sum = parseFloat(e.currentTarget.value, 10);
        const isCorrect = this.isSumValid(sum);
        this.setState({
          sum: sum,
          sumErrorText: isCorrect ? undefined : 'Число от 2 до 1000'
        });
        this.validate(undefined, sum);
    }

    onCheckAnswersChanged(e, isChecked) {
      this.setState({checkAnswers: isChecked});
    }

    onSound(e, isChecked) {
      this.setState({sound: isChecked});
    }

    isSumValid(sum) {
        return !isNaN(sum) && sum >=2 && sum <= 100
    }

    validate(speed, sum) {
        const _sum = sum !== undefined ? sum : this.state.sum;
        const isValid = this.props.speed && this.isSumValid(_sum);
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
                className="Test1Settings_Button"/>
            </span>
        );

        return (
            <div className="Test1Settings">
                <h2>Настройки</h2>
                <Speed value={this.props.speed}
                onChange={this.onSpeedChanged}/>
                <Paper className="setingsPaper" zDepth={1} rounded={false} >
                    <h4>Разрядность</h4>
                    <div className="Test1Settings_DigitsContainer">
                        <div className="Test1Settings_DigitsLabel">от</div>
                        <div>
                            <SelectField value={this.state.minDigits}  style={{width: 80}}
                            onChange={this.onMinDigitsChanged}>
                              <MenuItem value={1} primaryText="1" />
                              <MenuItem value={2} primaryText="2" />
                              <MenuItem value={3} primaryText="3" />
                              <MenuItem value={4} primaryText="4" />
                            </SelectField>
                        </div>
                        <div className="Test1Settings_DigitsLabel">до</div>
                        <div>
                          <SelectField value={this.state.maxDigits}  style={{width: 80}}
                          onChange={this.onMaxDigitsChanged}>
                            <MenuItem value={1} primaryText="1" />
                            <MenuItem value={2} primaryText="2" />
                            <MenuItem value={3} primaryText="3" />
                            <MenuItem value={4} primaryText="4" />
                          </SelectField>
                        </div>
                    </div>
                </Paper>
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
                              label="Простой"
                            />
                            <RadioButton
                              value={2}
                              label="Переход через 5 (помощь Брата)"
                            />
                            <RadioButton
                              value={3}
                              label="Переход через 10 (помощь Друга)"
                            />
                          </RadioButtonGroup>
                      </div>
                      <div style={{width: 50}}>
                        <SelectField value={this.state.maxNumber} style={{width: 50}}
                        autoWidth={true} onChange={this.onMaxNumberChanged}
                        disabled={this.state.complexity !== 0}>
                          <MenuItem value={4} primaryText="4" />
                          <MenuItem value={5} primaryText="5" />
                          <MenuItem value={6} primaryText="6" />
                          <MenuItem value={7} primaryText="7" />
                          <MenuItem value={8} primaryText="8" />
                        </SelectField>
                      </div>
                    </div>
                </Paper>

                <Paper className="setingsPaper" zDepth={1} rounded={false}>
                  <h4>Слагаемыe</h4>
                  <div className="flexContainer"  style={{padding: 8}}>
                    <div style={{padding: '15px 8px 8px'}}>Сколько цифр будем складывать</div>
                    <div style={{width: 130}}>
                        <TextField
                          name="inpSum"
                          id="inpSum"
                          type="number"
                          step="1"
                          value={this.state.sum}
                          errorText={this.state.sumErrorText}
                          min="2"
                          max="1000"
                          required
                          onChange={this.onSumChanged}
                          fullWidth={true}
                        />
                      </div>
                    </div>
                </Paper>
                <Paper className="setingsPaper" zDepth={1} rounded={false}>
                  <div style={{width: 240, padding: '24px 8px'}}>
                    <Toggle
                          label="Домашняя работа"
                          toggled={this.state.checkAnswers}
                          onToggle={this.onCheckAnswersChanged}
                        />
                  </div>
                </Paper>
                <Paper className="setingsPaper" zDepth={1} rounded={false}>
                  <div style={{width: 240, padding: '24px 8px'}}>
                    <Toggle
                          label="Звук"
                          disabled={!this.state.isSoundEnable}
                          toggled={this.state.sound}
                          onToggle={this.onSound}
                        />
                  </div>
                </Paper>
                <div className="Test1Settings_Actions">
                  <div>
                      <RaisedButton label="Выбрать игру"
                        containerElement={<Link to='/'/>}
                        />
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

export default Test1Settings;
