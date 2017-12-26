import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import './Test1Settings.css'

class Test1Settings extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);
        this.onSpeedChanged = this.onSpeedChanged.bind(this);
        this.onSpeedClicked = this.onSpeedClicked.bind(this);
        this.onComplexityChanged = this.onComplexityChanged.bind(this);
        this.onMinDigitsChanged = this.onMinDigitsChanged.bind(this);
        this.onMaxDigitsChanged = this.onMaxDigitsChanged.bind(this);
        this.onCheckAnswersChanged = this.onCheckAnswersChanged.bind(this);
        this.onMaxNumberChanged = this.onMaxNumberChanged.bind(this);
        this.onSumChanged = this.onSumChanged.bind(this);
        this.state = {
          speed: this.props.speed,
          complexity: this.props.complexity,
          minDigits: 1,
          maxDigits: 1,
          checkAnswers: true,
          maxNumber: 4,
          sum: 4
        };
    }

    onSettingsComplete() {
        this.props.onComplete(this.state);
    }

    onSpeedChanged(e) {
        let speed = parseFloat(e.currentTarget.value, 10);
        this.setState({speed: speed * 1000});
    }

    onSpeedClicked(e) {
        this.setState({speed: parseInt(e.currentTarget.value, 10)});
    }

    onComplexityChanged(e, value) {
        this.setState({complexity: value});
    }

    onMinDigitsChanged(e, key, payload) {
      const change = {minDigits: payload};
      if (this.state.maxDigits < payload) {
        change.maxDigits = payload;
      }
      this.setState(change);
    }

    onMaxDigitsChanged(e, key, payload) {
      const change = {maxDigits: payload};
      this.setState(change);
    }

    onMaxNumberChanged(e, key, payload) {
      const change = {maxNumber: payload};
      this.setState(change);
    }

    onSumChanged(e) {
        let sum = parseFloat(e.currentTarget.value, 10);
        this.setState({sum: sum});
    }

    onCheckAnswersChanged(e, isChecked) {
      this.setState({checkAnswers: isChecked});
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
                className="settingsButton"/>
            </span>
        );

        return (
            <div className="Test1Setings">
                <h2>Настройки</h2>
                <fieldset>
                    <legend>Скорость: {this.state.speed}</legend>
                    {contentSpeed}
                    <TextField
                      name="inpSpeed"
                      id="inpSpeed"
                      type="number"
                      step="0.1"
                      value={this.state.speed ? this.state.speed / 1000 : ''}
                      errorText="!"
                      min="0.3"
                      max="10"
                      required
                      onChange={this.onSpeedChanged}
                      className="numberField"
                    />
                    <span>сек</span>
                </fieldset>
                <fieldset>
                    <legend>Разрядность</legend>
                    <span>от</span>
                    <SelectField value={this.state.minDigits} style={{width: 50}}
                    autoWidth={true} onChange={this.onMinDigitsChanged}>
                      <MenuItem value={1} primaryText="1" />
                      <MenuItem value={2} primaryText="2" />
                      <MenuItem value={3} primaryText="3" />
                      <MenuItem value={4} primaryText="4" />
                    </SelectField>
                    <span>до</span>
                    <SelectField value={this.state.maxDigits} style={{width: 50}}
                    autoWidth={true} onChange={this.onMaxDigitsChanged}>
                      <MenuItem value={1} primaryText="1" />
                      <MenuItem value={2} primaryText="2" />
                      <MenuItem value={3} primaryText="3" />
                      <MenuItem value={4} primaryText="4" />
                    </SelectField>
                </fieldset>
                <fieldset>
                    <legend>Сложность: {this.state.complexity}</legend>
                    <div className="flexContainer">
                      <div>
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
                </fieldset>
                <fieldset>
                  <legend>Слагаемых</legend>
                  <TextField
                    name="inpSum"
                    id="inpSum"
                    type="number"
                    step="1"
                    value={this.state.sum}
                    errorText="!"
                    min="2"
                    max="1000"
                    required
                    onChange={this.onSumChanged}
                    className="numberField"
                  />
                </fieldset>
                <div style={{width: 300}}>
                  <Toggle
                        label="Домашняя работа"
                        toggled={this.state.checkAnswers}
                        onToggle={this.onCheckAnswersChanged}
                      />
                </div>
                <div>
                  <RaisedButton label="Выбрать игру"
                    containerElement={<Link to='/'/>}
                    className="settingsButton"/>
                  <FloatingActionButton  onClick={this.onSettingsComplete}>
                      <Play />
                  </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default Test1Settings;
