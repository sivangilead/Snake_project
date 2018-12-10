import React from 'react';
import {connect} from 'react-redux';

const Score = function(props) {
  return <div>Score:{props.score}</div>;
};

const mapState = state => ({
  score: state.score.current,
});

export default connect(
  mapState,
  null,
)(Score);
