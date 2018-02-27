import React, {Component} from 'react';
import cookie from 'react-cookies';

import Test1Settings from './settings/Test1Settings'
import Test1Run from './run/Test1Run'
import Test1Result from './result/Test1Result'

import AudioHelper from './AudioHelper';

class Test1 extends Component {
    constructor(props) {
        super(props);
        this.onSettingsComplete = this.onSettingsComplete.bind(this);
        this.onRunComplete = this.onRunComplete.bind(this);
        this.onResultComplete = this.onResultComplete.bind(this);
        this.state = {
            step: 0,
            result: 1,
            settings: {}
        };

        this.audio = new AudioHelper();
    }

    componentWillMount() {
        const defs = {
            speed: 1500,
            complexity: 1,
            minDigits: 1,
            maxDigits: 1,
            sum: 4,
            checkAnswers: true,
            maxNumber: 4,
            sound: true
        };

        const settings = cookie.load('test1') || defs;

        this.setState({settings: settings});

        if (settings.sound) {
            this.audio.load();
        }
    }

    onSettingsComplete(cfg) {
        let nextStep = 1;
        if (cfg.sound) {
            if (!this.audio.isBuffered) {
                if (!this.audio.isBuffering) {
                    this.audio.load();
                }
                nextStep = 3;
                this.audio.onBuffered = () => {
                    this.setState({step: 1});
                }
            }
        }

        const settings = {
            speed: cfg.speed,
            complexity: cfg.complexity,
            minDigits: cfg.minDigits,
            maxDigits: cfg.maxDigits,
            sum: cfg.sum,
            checkAnswers: cfg.checkAnswers,
            maxNumber: cfg.maxNumber,
            sound: cfg.sound
        };

        this.setState({
            step: nextStep, settings: settings});

        cookie.save('test1', settings);
    }

    onRunComplete(_result) {
        if (this.state.settings.checkAnswers) {
            this.setState({step: 2, result: _result});
        } else {
            this.setState({step: 0});
        }
    }

    onResultComplete() {
        this.setState({step: 0});
    }

    render() {
        let body = <Test1Settings onComplete={this.onSettingsComplete}
                                  speed={this.state.settings.speed}
                                  complexity={this.state.settings.complexity}
                                  minDigits={this.state.settings.minDigits}
                                  maxDigits={this.state.settings.maxDigits}
                                  sum={this.state.settings.sum}
                                  checkAnswers={this.state.settings.checkAnswers}
                                  maxNumber={this.state.settings.maxNumber}
                                  sound={this.state.settings.sound}
        />;
        switch (this.state.step) {
            default:
                break;
            case 1:
                body = <Test1Run onComplete={this.onRunComplete} result={this.state.result}
                                 settings={this.state.settings}/>;
                break;
            case 2:
                body = <Test1Result onComplete={this.onResultComplete} result={this.state.result}/>;
                break;
            case 3:
                body = <h3>Подождите. Подружаем звук...</h3>;
                break;
        }

        return (
            <div>
                <header>
                    <h1>Цифрочки</h1>
                </header>
                <main>
                    {body}
                </main>
            </div>
        );
    }
}

export default Test1;
