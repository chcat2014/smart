import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'

class Test2 extends Component {
  render() {
    return (
        <div>
            <header>
                <h1>Test 2</h1>
            </header>
            <main>
                <p>В разработке</p>
                <RaisedButton label="Назад"
                              containerElement={<Link to='/'/>}
                              primary={true}/>
            </main>
        </div>
    );
  }
}

export default Test2;
