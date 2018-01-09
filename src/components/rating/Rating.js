import React, {Component} from 'react';
import Label from 'material-ui/svg-icons/action/label';
import LabelOutline from 'material-ui/svg-icons/action/label-outline';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Rating extends Component {
    constructor(props) {
        super(props);

        this.theme = props.muiTheme;
    }
    render() {
        const content = [];
        for(let i=1; i<=this.props.total; i++){
            if (i < this.props.current) {
                content.push(<Label color={this.theme.palette.primary1Color} key={i} />);
            }
            if (i === this.props.current) {
                content.push(<Label color={this.theme.palette.accent1Color} key={i} />);
            }
            if (i > this.props.current) {
                content.push(<LabelOutline color={this.theme.palette.primary1Color} key={i} />);
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

export default muiThemeable()(Rating);
