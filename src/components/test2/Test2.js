import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Test2 extends Component {
  render() {
    return (
        <div>
          <h1>Test 2</h1>
          <Link to='/'>Home</Link>
        </div>
    );
  }
}

export default Test2;
