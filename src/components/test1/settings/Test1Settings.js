import React, {Component} from 'react';

class Test1Settings extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);
        this.onSpeedChanged = this.onSpeedChanged.bind(this);
        this.onComplexityChanged = this.onComplexityChanged.bind(this);
        this.state = {speed: this.props.speed, complexity: this.props.complexity};
    }

    onSettingsComplete() {
        this.props.onComplete(this.state.speed, this.state.complexity);
    }

    onSpeedChanged(e) {
        this.setState({speed: parseInt(e.currentTarget.value, 10)});
    }

    onComplexityChanged(e) {
        this.setState({complexity: parseInt(e.currentTarget.value, 10)});
    }

    render() {
        const speeds = [
            {id: 1, name: 'Медленно (30 сек)', value: 30000},
            {id: 2, name: 'Средне (15 сек)', value: 15000},
            {id: 3, name: 'Быстро (2 сек)', value: 2000}
        ];

        const contentSpeed = speeds.map((speed) =>
            <span key={speed.id}>
                <input type="radio" name="speed" id={'chkSpeed' + speed.id}
                       checked={this.state.speed === speed.value}
                       value={speed.value}
                       onChange={this.onSpeedChanged}/>
                <label htmlFor={'chkSpeed' + speed.id}>{speed.name}</label>
            </span>
        );

        const complexities = [
            {id: 1, name: '1 разряд (1-9)', value: 1},
            {id: 2, name: '2 разряда (1-99)', value: 2},
            {id: 3, name: '3 разряда (1-999)', value: 3},
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
            <div>
                <h2>Настройки</h2>
                <fieldset>
                    <legend>Скорость: {this.state.speed}</legend>
                    {contentSpeed}
                </fieldset>
                <fieldset>
                    <legend>Сложность: {this.state.complexity}</legend>
                    {contentComplexity}
                </fieldset>
                <button onClick={this.onSettingsComplete}>
                    Начали
                </button>
            </div>
        );
    }
}

export default Test1Settings;
