﻿import React, {Component} from 'react';
import Generator from '../Generator';
import Rating from '../../rating/Rating';
import Paper from 'material-ui/Paper';
import Test1Answer from '../answer/Test1Answer';

import './Test1Run.css'

class Test1Run extends Component {
    constructor(props) {
        super(props);
        this.nextTick = this.nextTick.bind(this);
        this.nextPause = this.nextPause.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.nextExercise = this.nextExercise.bind(this);

        this.generator = new Generator(this.props.settings);

        this.pauseDelay = this.props.settings.speed;
        this.tickDelay = 100;
        this.showAnswer = !this.props.settings.checkAnswers;

        this.state = {
          digit: '',
          count: 0,
          sum: 0,
          maxCount: this.props.settings.sum,
          show: false,
          exercise: 1,
          exercisesCount: 3,
          showResult: false,
          exerciseStr: ''
        };
        this.answers = [];
        for (let i = 0; i < this.state.exercisesCount; i++) {
          this.answers[i] = false;
        }

        this.tick = setTimeout(this.nextTick, 50);
    }

    getRandom() {
        return this.generator.next();
    }

    nextTick() {
        if (this.state.count < this.state.maxCount) {
            const digit = this.getRandom();
            this.setState({
                digit: digit,
                count: this.state.count + 1,
                sum: this.generator.getSum(),
                show: true,
                showResult: false
            });
            this.tick = setTimeout(this.nextPause, this.pauseDelay);
        } else {
          this.setState({
              exerciseStr:  this.generator.getExerciseString(),
              showResult: true
          });
        }
    }

    nextExercise(isCorrect) {
      this.answers[this.state.exercise - 1] = isCorrect;
      const exercise = this.state.exercise + 1;
      if (exercise <= this.state.exercisesCount) {
        this.generator.nextExercise();
        this.setState({
            count: 0,
            sum: 0,
            exercise: exercise
        });
        this.tick = setTimeout(this.nextTick, 50);
      } else {
        let correctAnswers = 0;
        if (!this.showAnswer) {
          for (let i = 0; i < this.state.exercisesCount; i++) {
            if (this.answers[i]) {
              correctAnswers++;
            }
          }
        } else {
          correctAnswers = -1;
        }
        this.props.onComplete(correctAnswers)
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
        this.generator.destroy();
    }

    render() {
      const test = <div>
        <Rating current={this.state.count} total={this.state.maxCount}></Rating>
        <Paper style={{display: 'inline-block', padding: 30, margin: 20, overflow: 'visible'}} zDepth={1} rounded={false} >
            <h1 style={{opacity: this.state.show ? 1 : 0}} className="digit">{this.state.digit > 0 ? '+' : ''}{this.state.digit}&nbsp;</h1>
        </Paper>
      </div>;
      const answer = <Test1Answer onNext={this.nextExercise}
                                  sum={this.state.sum}
                                  showAnswer={this.showAnswer}
                                  exercise={this.state.exerciseStr}/>;

      const content = this.state.showResult
        ? answer
        : test;

        return (
            <div className="Test1Run">
                <h3>Пример {this.state.exercise} из {this.state.exercisesCount}</h3>
                {content}
            </div>
        );
    }
}

export default Test1Run;
