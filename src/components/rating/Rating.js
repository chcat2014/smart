import React, {Component} from 'react';

class Rating extends Component {
    render() {
        return (
            <div>
                Шаг {this.props.current} из {this.props.total}
            </div>
        );
    }
}

export default Rating;
