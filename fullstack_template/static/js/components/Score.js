import React from 'react';
import {connect} from 'react-redux';

const Score = function(props) {
  return (
    <div className="score">
      <h3>Score:{props.score}</h3>
    </div>
  );
};

const mapState = state => ({
  score: state.score.current,
});

export default connect(
  mapState,
  null,
)(Score);
