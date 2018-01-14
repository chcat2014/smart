import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Replay from 'material-ui/svg-icons/av/replay';
import RaisedButton from 'material-ui/RaisedButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import {Link} from 'react-router-dom';

class Test1Result extends Component {
    render() {
      let showResult = <h2>Правильных ответов: {this.props.result}</h2>;
      if (this.props.result === -1) {
        showResult = <h2>Вернуться к настройкам</h2>;
      }
        if (this.props.result >= 9) {
            showResult = <h2>Отлично!</h2>;
        }
        if (this.props.result > 4 && this.props.result < 9) {
            showResult = <h2>Молодец!</h2>;
        }
        if (this.props.result <4) {
            showResult = <h2>Хорошо!</h2>;
        }
        return (
            <div>
                <div>
                {showResult}
                    <FloatingActionButton  onClick={this.props.onComplete}>
                    <Replay />
                     </FloatingActionButton>
                </div>
                {showResult}
                <div>
                     <RaisedButton label="Выбрать игру"
                     containerElement={<Link to='/'/>} className="settingsButton"/>
                     <FloatingActionButton  onClick={this.onSettingsComplete}>
                     <Play />
                     </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default Test1Result;
