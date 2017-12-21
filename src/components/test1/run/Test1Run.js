import React, {Component} from 'react';
import Random from 'random-js';
import Rating from '../../rating/Rating';

import './Test1Run.css'

class Test1Run extends Component {
    constructor(props) {
        super(props);
        this.nextTick = this.nextTick.bind(this);
        this.nextPause = this.nextPause.bind(this);
        this.getRandom = this.getRandom.bind(this);

        this.random = new Random();

        this.pauseDelay = this.props.settings.speed * 0.2;
        this.tickDelay = this.props.settings.speed * 0.8;
        this.minNumber = Math.pow(10, this.props.settings.complexity - 1);
        this.maxNumber = Math.pow(10, this.props.settings.complexity) - 1;

        this.state = {digit: '', count: 0, sum: 0, maxCount: 5, show: false};

        this.tick = setTimeout(this.nextTick, 50);
    }

    getRandom() {
        const digit = this.random.integer(this.minNumber, this.maxNumber);
        return digit;
    }

    nextTick() {
        if (this.state.count < this.state.maxCount) {
            const digit = this.getRandom();
            this.setState({
                digit: digit,
                count: this.state.count + 1,
                sum: this.state.sum + digit,
                show: true
            });
            this.tick = setTimeout(this.nextPause, this.pauseDelay);
        } else {
            this.props.onComplete(this.state.sum)
        }
    }

    nextPause() {
        this.setState({
            show: false
        });
        this.tick = setTimeout(this.nextTick, this.tickDelay);
    }

    componentWillUnmount() {
        if(this.tick) {
            clearTimeout(this.tick);
        }
    }

    render() {
        return (
            <div className="Test1Run">
                <Rating current={this.state.count} total={this.state.maxCount}></Rating>
                <h1 style={{opacity: this.state.show ? 1 : 0}} className="digit">{this.state.digit > 0 ? '+' : ''}{this.state.digit}&nbsp;</h1>
                <p>Сумма: {this.state.sum}</p>
            </div>
        );
    }
}

export default Test1Run;
