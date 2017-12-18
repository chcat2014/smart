import React, {Component} from 'react';

class Test1Run extends Component {
    constructor(props) {
        super(props);

        setTimeout(()=>{
            this.props.onComplete(Math.random());
        }, 3 * 1000)
    }

    render() {
        return (
            <div>
                <h2>Calculating...</h2>
            </div>
        );
    }
}

export default Test1Run;
