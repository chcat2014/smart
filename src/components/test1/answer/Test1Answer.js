import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {green500, red500, indigo700} from "material-ui/styles/colors";

import './Test1Answer.css'

class Test1Result extends Component {
    constructor(props) {
        super(props);
        this.onAnswerChanged = this.onAnswerChanged.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onShowAnswer = this.onShowAnswer.bind(this);
        this.onShowExercise = this.onShowExercise.bind(this);

        this.sum = this.props.sum;
        this.exercise = this.props.exercise;
        this.showAnswer = this.props.showAnswer;
        this.state = {
            displayAnswer: false,
            displayExercise: false,
            isCorrect: false,
            answer: '',
            answerText: undefined,
            answerStyle: {color: indigo700}
        };
    }

    onAnswerChanged(e) {
        const answer = parseInt(e.currentTarget.value, 10);
        const isCorrect = answer === this.sum;

        this.setState({
            isCorrect: isCorrect,
            answer: e.currentTarget.value,
            answerText: isCorrect ? 'Правильно' : 'Неправильно',
            answerStyle: isCorrect ? {color: green500} : {color: red500}
        });
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
        const check = <div>
            <Paper className="Test1Answer_Paper" zDepth={1} rounded={false} >
                <TextField
                    type="number"
                    value={this.state.answer}
                    errorText={this.state.answerText}
                    onChange={this.onAnswerChanged}
                    className="numberField"
                    floatingLabelText="Ответ"
                    errorStyle={this.state.answerStyle}
                    ref={(input) => { this.nameInput = input; }}
                />
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
                              primary={this.state.isCorrect}
                              className="Test1Answer_Button"/>
            </div>
        );
    }
}

export default Test1Result;
