import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Replay from 'material-ui/svg-icons/av/replay';

class Test1Result extends Component {
    render() {
        return (
            <div>
                <h2>Сумма: {this.props.result}</h2>
                <FloatingActionButton  onClick={this.props.onComplete}>
                    <Replay />
                </FloatingActionButton>
            </div>
        );
    }
}

export default Test1Result;
