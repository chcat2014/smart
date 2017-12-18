import React, {Component} from 'react';

class Test1Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Settings</h2>
                <button onClick={this.props.onComplete}>
                    Start
                </button>
            </div>
        );
    }
}

export default Test1Settings;
