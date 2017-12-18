import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Test1 extends Component {
  render() {
    return (
        <div>
          <h1>Test 1</h1>
          <Link to='/'>Home</Link>
        </div>
    );
  }
}

export default Test1;
