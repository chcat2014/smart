import React, {Component} from 'react';
import Label from 'material-ui/svg-icons/action/label';
import LabelOutline from 'material-ui/svg-icons/action/label-outline';
import {red600, blue700} from 'material-ui/styles/colors';

class Rating extends Component {

    render() {
        const content = [];
        for(let i=1; i<=this.props.total; i++){
            if (i < this.props.current) {
                content.push(<Label color={blue700} key={i}></Label>);
            }
            if (i === this.props.current) {
                content.push(<Label color={red600} key={i}></Label>);
            }
            if (i > this.props.current) {
                content.push(<LabelOutline color={blue700} key={i}></LabelOutline>);
            }
        }
        return (
            <div>
                <div>Шаг {this.props.current} из {this.props.total}</div>
                <div>{content}</div>
            </div>
        );
    }
}

export default Rating;
