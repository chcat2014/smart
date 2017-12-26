import React, {Component} from 'react';
import Random from 'random-js';
import Rating from '../../rating/Rating';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './Test1Run.css'

class Test1Run extends Component {
    constructor(props) {
        super(props);
        this.nextTick = this.nextTick.bind(this);
        this.nextPause = this.nextPause.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.nextExercise = this.nextExercise.bind(this);

        this.random = new Random();

        this.pauseDelay = this.props.settings.speed;
        this.tickDelay = 100;
        this.minNumber = Math.pow(10, this.props.settings.minDigits - 1);
        this.maxNumber = Math.pow(10, this.props.settings.maxDigits) - 1;
        this.showAnswer = !this.props.settings.checkAnswers;

        this.state = {
          digit: '',
          count: 0,
          sum: 0,
          maxCount: this.props.settings.sum,
          show: false,
          exercise: 1,
          exercisesCount: 3,
          showResult: false
        };

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
                show: true,
                showResult: false
            });
            this.tick = setTimeout(this.nextPause, this.pauseDelay);
        } else {
          this.setState({
              showResult: true
          });
        }
    }

    nextExercise() {
      const exercise = this.state.exercise + 1;
      if (exercise <= this.state.exercisesCount) {
        const digit = this.getRandom();
        this.setState({
            count: 0,
            sum: 0,
            exercise: exercise
        });
        this.tick = setTimeout(this.nextTick, 50);
      } else {
        this.props.onComplete('FINISH')
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
      const test = <div>
        <Rating current={this.state.count} total={this.state.maxCount}></Rating>
        <Paper style={{display: 'inline-block', padding: 30, margin: 20, overflow: 'visible'}} zDepth={1} rounded={false} >
            <h1 style={{opacity: this.state.show ? 1 : 0}} className="digit">{this.state.digit > 0 ? '+' : ''}{this.state.digit}&nbsp;</h1>
        </Paper>
      </div>;
      const res = <div>
          <p>Сумма: {this.state.sum}</p>
          <RaisedButton label="Продолжить"
            onClick={this.nextExercise}
            className="settingsButton"/>
      </div>;
      const content = this.state.showResult ? res : test;

        return (
            <div className="Test1Run">
                <h3>Пример {this.state.exercise} из {this.state.exercisesCount}</h3>
                {content}
            </div>
        );
    }
}

export default Test1Run;
