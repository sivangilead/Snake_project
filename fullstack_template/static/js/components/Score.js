import React from 'react';
import {connect} from 'react-redux';

const Score = function(props) {
  return <div>{props.score}</div>;
};

const mapState = state => ({
  score: state.score,
});

export default connect(
  mapState,
  null,
)(Score);
