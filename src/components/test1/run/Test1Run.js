import React, {Component} from 'react';

class Test1Run extends Component {
    constructor(props) {
        super(props);
        this.nextTick = this.nextTick.bind(this);
        this.getRandom = this.getRandom.bind(this);

        this.MAX_COUNT = 5;
        this.speed = this.props.settings.speed;
        this.minNumber = 1;
        this.maxNumber = Math.pow(10, this.props.settings.complexity) - 1;

        this.state = {digit: '', count: 0, sum: 0};

        setTimeout(this.nextTick, 50);
    }

    getRandom() {
        const sign = Math.random() > 0.5 ? 1 : -1;
        const digit = Math.floor(Math.random() * (this.maxNumber - this.minNumber + 1)) + this.minNumber;
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
            setTimeout(this.nextTick, this.speed);
        } else {
            this.props.onComplete(this.state.sum)
        }
    }

    render() {
        return (
            <div>
                <h2>Шаг {this.state.count}: {this.state.digit}</h2>
                <h3>Сумма: {this.state.sum}</h3>
            </div>
        );
    }
}

export default Test1Run;
