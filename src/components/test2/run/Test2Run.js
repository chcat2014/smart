import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';


class Test2Run extends Component {
    constructor(props) {
        super(props);
        this.nextTick = this.nextTick.bind(this);
        this.nextPause = this.nextPause.bind(this);
        this.stop = this.stop.bind(this);

        this.pauseDelay = this.props.settings.speed;
        this.tickDelay = 100;

        this.digits = [];
        if (this.props.settings.complexity) {
            this.digits.push({
                id: 1,
                max: null,
                changeble: this.isChangeble(1, this.props.settings.complexity)
            });
            this.digits.push({
                id: 2,
                max: null,
                changeble: this.isChangeble(2, this.props.settings.complexity)
            });
            this.digits.push({
                id: 3,
                max: null,
                changeble: this.isChangeble(3, this.props.settings.complexity)
            });
        } else {
            this.digits.push({
                id: 0,
                max: this.props.settings.maxNumber || 9,
                changeble: true
            })
        }

        this.state = {
            values: []
        };

        this.tick = setTimeout(this.next, 50);
    }
    isChangeble(iteration, complexity) {
        if (complexity === 1 || complexity === 3) {
            return iteration === complexity
        }
        return true;
    }
    nextTick() {
        this.tick = setTimeout(this.nextPause, this.pauseDelay);
    }

    nextPause() {
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
        var content = "";
        return (
            <div className="Test2Run">
                <div>{content}</div>
                <RaisedButton label="Назад" onClick={this.stop}/>
            </div>
        );
    }
}


export default Test2Run;