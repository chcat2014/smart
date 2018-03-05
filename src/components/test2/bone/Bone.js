import React, {Component} from 'react';
import './Bone.css'

class Bone extends Component {
    render() {
        const HEIGHT = 30;
        var start = (this.props.position > 0 ? 2*HEIGHT + 10 : HEIGHT);
        var shift = this.props.isShift ? -HEIGHT : 0;
        var top = start + this.props.position * HEIGHT + shift;
        return (
            <div className="Bone" style={{top: top + 'px'}}></div>
        );
    }
}


export default Bone;