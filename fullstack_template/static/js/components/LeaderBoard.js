import React, {Component} from 'react';
import {render} from 'react-dom';
import Konva from 'konva';
import {connect} from 'react-redux';
import {getScores} from '../store/score';

class LeaderBoard extends Component {
  async componentDidMount() {
    await this.props.getScores();
  }
  render() {
    return (
      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Place</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name </th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {this.props.scores
              ? this.props.scores.map((obj, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{obj.firstname}</td>
                      <td>{obj.lastname}</td>
                      <td>{obj.score}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    scores: state.score.scoresList,
  };
};

const mapDispatch = dispatch => ({
  getScores: () => dispatch(getScores()),
});

export default connect(
  mapStateToProps,
  mapDispatch,
)(LeaderBoard);
