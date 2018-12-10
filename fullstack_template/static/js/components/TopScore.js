import React, {Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {updateTopScore} from '../store/score';
class TopScore extends Component {
  async componentDidMount() {
    let name = this.props.name;
    this.props.updateTopScore(name);
  }

  render() {
    return (
      <div>
        <h1>My Top Score:{this.props.topscore} </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user,
    topscore: state.score.topscore,
  };
};

const mapDispatch = dispatch => ({
  updateTopScore: topscore => dispatch(updateTopScore(topscore)),
});

export default connect(
  mapStateToProps,
  mapDispatch,
)(TopScore);
