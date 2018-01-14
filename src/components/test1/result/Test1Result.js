import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Replay from 'material-ui/svg-icons/av/replay';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import {lightGreen500, green500, teal500} from 'material-ui/styles/colors';

import'./Test1Result.css'

class Test1Result extends Component {
    render() {
      let showResult = <h2>Правильных ответов: {this.props.result}</h2>;
      if (this.props.result === -1) {
        showResult = <h2>Вернуться к настройкам</h2>;
      }
        if (this.props.result >= 9) {
            showResult = <h2 style={{color: green500}}>Отлично!</h2>;
        }
        if (this.props.result > 4 && this.props.result < 9) {
            showResult = <h2 style={{color: lightGreen500}}>Молодец!</h2>;
        }
        if (this.props.result <=4) {
            showResult = <h2 style={{color: teal500}}>Хорошо!</h2>;
        }
        return (
            <div>
                <div >
                    <Paper className="Test1Result_box">
                         {showResult}
                    </Paper>
                    <div className="Test1Result_flexContainer" style={{justifyContent: 'space-between'}}>
                          <RaisedButton label="Выбрать игру" containerElement={<Link to='/'/>} />
                          <FloatingActionButton  onClick={this.props.onComplete}>
                             <Replay />
                          </FloatingActionButton>
                </div>
                </div>
            </div>
        );
    }
}

export default Test1Result;
