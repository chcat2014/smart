import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Random from 'random-js';
import Spindle from '../spindle/Spindle';

import './Test2Run.css'

class Test2Run extends Component {
    constructor(props) {
        super(props);
        this.nextTick = this.nextTick.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.stop = this.stop.bind(this);

        this.tickDelay = this.props.settings.speed;
        this.random = new Random();

        this.digits = [];
        if (this.props.settings.complexity) {
            this.digits.push({
                id: 0,
                min: 1,
                max: 9,
                changeble: this.isChangeble(1)
            });
            this.digits.push({
                id: 1,
                min: 0,
                max: 9,
                changeble: this.isChangeble(2)
            });
            if (this.props.settings.complexity > 2) {
                this.digits.push({
                    id: 2,
                    min: 0,
                    max: 9,
                    changeble: this.isChangeble(3)
                });
            }
        } else {
            this.digits.push({
                id: 0,
                min: 0,
                max: this.props.settings.maxNumber || 9,
                changeble: true
            })
        }

        this.state = {
            values: []
        };

        this.tick = setTimeout(this.nextTick, 50);
    }
    isChangeble(iteration) {
        var c = this.props.settings.complexity;
        if (iteration === 2) {
            return c === 2 || c === 4
        }
        if (iteration === 3) {
            return c === 4
        }
        return true;
    }
    getNumber(d) {
        var r = this.random.integer(d.min, d.max);
        while(r === this.state.values[d.id]) {
            r = this.random.integer(d.min, d.max);
        }

        return r;
    }
    nextTick() {
        var values = this.digits.map(d => {
           if (d.changeble) {
               return this.getNumber(d);
           }
           return 0;
        });
        this.setState({
            values: values
        });
        this.tick = setTimeout(this.nextTick, this.tickDelay);
    }

    stop() {
        if (this.tick) {
            clearTimeout(this.tick);
        }
        this.props.onBack();
    }

    componentWillUnmount() {
        if (this.tick) {
            clearTimeout(this.tick);
        }
    }

    render() {
        var content = this.digits.map((d) => {
            return <Spindle key={d.id} value={this.state.values[d.id]}></Spindle>
        });
        return (
            <div className="Test2Run">
                <div className="Board">
                    {content}
                    <div className="Delimeter"></div>
                </div>
                <RaisedButton label="Назад" onClick={this.stop}/>
            </div>
        );
    }
}


export default Test2Run;