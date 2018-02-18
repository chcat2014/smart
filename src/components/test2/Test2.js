import React, { Component } from 'react';


import Test2Settings from './Test2Settings/Test2Settings';
import Test2Run from './run/Test2Run';


class Test2 extends Component {
    constructor(props) {
        super(props);
        this.run = this.run.bind(this);
        this.back = this.back.bind(this);
        this.state = {
            view: 0,
        };

    }

    run(){
        this.setState({
            view: 1
        })
    }

    back(){
        this.setState({
            view: 0
        })
    }

    render() {

        var content = this.state.view === 0 ? <Test2Settings onChange={this.run}/> : <Test2Run onChange={this.back}/>;

        return (
            <div>
                <header>
                    <h1>Test 2</h1>
                </header>
                <main>
                    {content}
                </main>
            </div>
        );
    }
}

export default Test2;
