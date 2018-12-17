import React, {Component} from 'react';
import Main from './components/Main';
import NameEntry from './components/NameEntry';
import {Route} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';

class Routes extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <Route exact path="/" component={NameEntry} />
        <Route path="/game" component={Main} />
      </div>
    );
  }
}

export default hot(Routes);
