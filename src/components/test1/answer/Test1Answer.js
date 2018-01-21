import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {green500, red500} from "material-ui/styles/colors";

import './Test1Answer.css'

class Test1Result extends Component {
    constructor(props) {
        super(props);
        this.onAnswerChanged = this.onAnswerChanged.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onShowAnswer = this.onShowAnswer.bind(this);
        this.onShowExercise = this.onShowExercise.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.sum = this.props.sum;
        this.exercise = this.props.exercise;
        this.showAnswer = this.props.showAnswer;
        this.state = {
            isChecked: false,
            displayAnswer: false,
            displayExercise: false,
            isCorrect: false,
            answer: '',
            answerText: 'Неправильно'
        };
    }

    onAnswerChanged(e) {
        const answer = parseInt(e.currentTarget.value, 10);
        const isCorrect = answer === this.sum;

        this.setState({
            isChecked: false,
            isCorrect: isCorrect,
            answer: e.currentTarget.value,
            answerText: isCorrect ? 'Правильно' : 'Неправильно'
        });
    }

    onCheck() {
      this.setState({
          isChecked: true
      });
    }

    onSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        if (this.state.isChecked) {
          this.onNext();
        } else {
          this.onCheck();
        }
    }

    onNext() {
          this.props.onNext(this.state.isCorrect);
    }

    onShowAnswer() {
        this.setState({displayAnswer: true, isCorrect: true});
    }

    onShowExercise() {
        this.setState({displayExercise: true});
    }

    componentDidMount() {
        if (this.nameInput) {
            this.nameInput.focus();
        }
    }

    render() {
        const checkRes = this.state.isChecked ?
          <div className="Test1Answer_CheckResult" style={{color: this.state.isCorrect ? green500 : red500}}>{this.state.answerText}</div>
          : <RaisedButton label="Проверить"
                          onClick={this.onCheck}
                          primary={true}
                          className="Test1Answer_Button"/>
        const check = <div>
            <Paper className="Test1Answer_Paper" zDepth={1} rounded={false} >
                <form onSubmit={this.onSubmit}>
                    <TextField
                        type="number"
                        value={this.state.answer}
                        onChange={this.onAnswerChanged}
                        className="numberField"
                        floatingLabelText="Ответ"
                        ref={(input) => { this.nameInput = input; }}
                    />
                </form>
                {checkRes}
            </Paper>
        </div>;
        const answ = this.state.displayAnswer ?
            <h3>Ответ: {this.sum}</h3>
            : <div><RaisedButton label="Показать ответ"
                            onClick={this.onShowAnswer}
                            primary={true}
                            className="Test1Answer_Button"/>
            </div>;
        const exer = this.state.displayExercise ?
            <Paper className="Test1Answer_Paper" zDepth={1} rounded={false} >{this.exercise}</Paper>
            : <div><RaisedButton label="Показать пример"
                            onClick={this.onShowExercise}
                            className="Test1Answer_Button"/>
            </div>;
        const res = <div>
            {exer}
            {answ}
        </div>;
        const content = this.showAnswer ? res : check;
        return (
            <div className="Test1Answer">
                {content}
                <RaisedButton label="Продолжить"
                              onClick={this.onNext}
                              primary={this.state.isCorrect && this.state.isChecked}
                              className="Test1Answer_Button"/>
            </div>
        );
    }
}

export default Test1Result;
