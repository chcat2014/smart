import React, {Component} from 'react';

class Test1Result extends Component {
    render() {
        return (
            <div>
                <h2>Result is {this.props.result}</h2>
                <button onClick={this.props.onComplete}>
                    Back
                </button>
            </div>
        );
    }
}

export default Test1Result;
