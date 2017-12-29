import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Replay from 'material-ui/svg-icons/av/replay';

class Test1Result extends Component {
    render() {
      let showResult = <h2>Правильных ответов: {this.props.result}</h2>;
      if (this.props.result === -1)  {
        showResult = <h2>Вернуться к настройкам</h2>;
      }
        return (
            <div>
                {showResult}
                <FloatingActionButton  onClick={this.props.onComplete}>
                    <Replay />
                </FloatingActionButton>
            </div>
        );
    }
}

export default Test1Result;
