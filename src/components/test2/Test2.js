import React, { Component } from 'react';


import Test2Settings from './settings/Test2Settings';
import Test2Run from './run/Test2Run';
import cookie from "react-cookies";


class Test2 extends Component {
    constructor(props) {
        super(props);
        this.run = this.run.bind(this);
        this.back = this.back.bind(this);
        this.state = {
            view: 0,
        };

    }

    componentWillMount() {
        const defs = {
            speed: 1500,
            complexity: 1,
            maxNumber: 9
        };

        const settings = cookie.load('test2') || defs;

        this.setState({settings: settings});
    }
    run(cfg){
        const settings = {
            speed: cfg.speed,
            complexity: cfg.complexity,
            maxNumber: cfg.maxNumber
        };
        this.setState({view: 1, settings: settings});

        cookie.save('test2', settings);
    }

    back(){
        this.setState({
            view: 0
        })
    }

    render() {

        var content = this.state.view === 0 ?
            <Test2Settings onChange={this.run}
                           speed={this.state.settings.speed}
                           complexity={this.state.settings.complexity}
                           maxNumber={this.state.settings.maxNumber}/>
            : <Test2Run onBack={this.back} settings={this.state.settings}/>;

        return (
            <div>
                <header>
                    <h1>Косточки</h1>
                </header>
                <main>
                    {content}
                </main>
            </div>
        );
    }
}

export default Test2;
