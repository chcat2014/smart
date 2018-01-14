import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Replay from 'material-ui/svg-icons/av/replay';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import {lightGreen900, deepOrange700, redA700
} from 'material-ui/styles/colors';

import'./Test1Result.css'

class Test1Result extends Component {
    render() {
      let showResult = <h2>Правильных ответов: {this.props.result}</h2>;
      if (this.props.result === -1) {
        showResult = <h2>Вернуться к настройкам</h2>;
      }
        if (this.props.result >= 9) {
            showResult = <h2 style={{color: lightGreen900}}>Отлично!</h2>;
        }
        if (this.props.result > 4 && this.props.result < 9) {
            showResult = <h2 style={{color: deepOrange700}}>Молодец!</h2>;
        }
        if (this.props.result <4) {
            showResult = <h2 style={{color: redA700
            }}>Хорошо!</h2>;
        }
        return (
            <div>
                <div>
                    <Paper className="box">
                {showResult}
                    </Paper>
                    <RaisedButton label="Выбрать игру"
                                  containerElement={<Link to='/'/>} />
                </div>
                <div>
                    <FloatingActionButton  onClick={this.props.onComplete}>
                        <Replay />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default Test1Result;
