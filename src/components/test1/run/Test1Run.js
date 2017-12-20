import React, {Component} from 'react';
import Random from 'random-js';

class Test1Run extends Component {
    constructor(props) {
        super(props);
        this.nextTick = this.nextTick.bind(this);
        this.getRandom = this.getRandom.bind(this);

        this.random = new Random();

        this.MAX_COUNT = 5;
        this.speed = this.props.settings.speed;
        this.minNumber = 1;
        this.maxNumber = Math.pow(10, this.props.settings.complexity) - 1;

        this.state = {digit: '', count: 0, sum: 0};

        this.tick = setTimeout(this.nextTick, 50);
    }

    getRandom() {
        const sign = this.random.bool() ? 1 : -1;
        const digit = this.random.integer(this.minNumber, this.maxNumber);
        return sign * digit;
    }

    nextTick() {
        if (this.state.count < this.MAX_COUNT) {
            const digit = this.getRandom();
            this.setState({
                digit: digit,
                count: this.state.count + 1,
                sum: this.state.sum + digit
            });
            this.tick = setTimeout(this.nextTick, this.speed);
        } else {
            this.props.onComplete(this.state.sum)
        }
    }

    componentWillUnmount() {
        if(this.tick) {
            clearTimeout(this.tick);
        }
    }

    render() {
        return (
            <div>
                <h2>Шаг {this.state.count}: {this.state.digit}</h2>
                <p>Сумма: {this.state.sum}</p>
            </div>
        );
    }
}

export default Test1Run;
