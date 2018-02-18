import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';


class Test2Run extends Component {

    render() {
        return (
            <div>
                <p>run</p>
                <div class="Test2Run">Sett</div>
                <RaisedButton label="Назад" onClick={this.props.onChange}/>
            </div>
        );
    }
}


export default Test2Run;