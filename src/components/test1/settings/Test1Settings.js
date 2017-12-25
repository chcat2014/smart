import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

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
        this.state = {
          speed: this.props.speed,
          complexity: this.props.complexity,
          minDigits: 1,
          maxDigits: 1,
          checkAnswers: true
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

    onComplexityChanged(e) {
        this.setState({complexity: parseInt(e.currentTarget.value, 10)});
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

        const complexities = [
            {id: 1, name: '1 разряд (1-9)', value: 1},
            {id: 2, name: '2 разряда (10-99)', value: 2},
            {id: 3, name: '3 разряда (100-999)', value: 3},
            {id: 4, name: '4 разряда (1000-9999)', value: 4},
            {id: 5, name: '5 разрядов (10000-99999)', value: 5},
        ];

        const contentComplexity = complexities.map((complexity) =>
            <span key={complexity.id}>
                <input type="radio" name="complexity" id={'chkComplexity' + complexity.id}
                       checked={this.state.complexity === complexity.value}
                       value={complexity.value}
                       onChange={this.onComplexityChanged}/>
                <label htmlFor={'chkComplexity' + complexity.id}>{complexity.name}</label>
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
                    {contentComplexity}
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
