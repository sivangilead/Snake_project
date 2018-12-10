import React, {Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import axios from 'axios';
class TopScore extends Component {
  constructor() {
    super();
    this.state = {topScore: 0};
  }
  async componentDidMount() {
    let nameArr = this.props.name.split(' ');
    console.log(nameArr);
    const {data} = await axios.get(
      `/api/score?firstname=${nameArr[0]}&lastname=${nameArr[1]}`,
    );
    this.setState({topScore: data[0]});
  }

  render() {
    return (
      <div>
        <h1>My Top Score:{this.state.topScore} </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(TopScore);
