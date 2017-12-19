import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import Test1Settings from './settings/Test1Settings'
import Test1Run from './run/Test1Run'
import Test1Result from './result/Test1Result'

class Test1 extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);
        this.onRunComplete = this.onRunComplete.bind(this);
        this.onResultComplete = this.onResultComplete.bind(this);
        this.state = {step: 0, result: 1, settings: {speed: 2000, complexity: 1}};
    }

    onSettingsComplete(speed, complexity) {
        this.setState({step: 1, settings: {speed: speed, complexity: complexity}});
    }

    onRunComplete(_result) {
        this.setState({step: 2, result: _result});
    }

    onResultComplete() {
        this.setState({step: 0});
    }

    render() {
        let body = <Test1Settings onComplete={this.onSettingsComplete} speed={this.state.settings.speed} complexity={this.state.settings.complexity}></Test1Settings>;
        switch (this.state.step) {
            default: break;
            case 1:
                body = <Test1Run onComplete={this.onRunComplete} result={this.state.result} settings={this.state.settings}></Test1Run>;
                break;
            case 2:
                body = <Test1Result onComplete={this.onResultComplete} result={this.state.result}></Test1Result>;
                break;
        }

        return (
            <div>
                <h1>Цифрочки</h1>
                <Link to='/'>Назад</Link>
                {body}
            </div>
        );
    }
}

export default Test1;
