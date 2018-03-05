import React, {Component} from 'react';
import Bone from './../bone/Bone';

import './Spindle.css'

class Spindle extends Component {
    getBones() {
        var bones = [];
        for (var i = 0; i < 5; i++) {
            bones.push(this.getBone(i));
        }

        return bones;
    }

    getBone(ind) {
        if (ind === 0) {
            return this.props.value > 4;
        }
        if (ind === 1) {
            return (this.props.value > 0 && this.props.value < 5) || this.props.value > 5;
        }
        if (ind === 2) {
            return (this.props.value > 1 &&  this.props.value < 5) || this.props.value > 6;
        }
        if (ind === 3) {
            return (this.props.value > 2 &&  this.props.value < 5) || this.props.value > 7;
        }
        if (ind === 4) {
            return (this.props.value > 3 &&  this.props.value < 5) || this.props.value > 8;
        }
        return false;
    }

    render() {
        var bones = this.getBones().map((b, i) => {
            return <Bone isShift={b} position={i} key={i}></Bone>
        });
        return (
            <div className="Spindle">
                {bones}
            </div>
        );
    }
}


export default Spindle;
