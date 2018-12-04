import React, {Component} from 'react';
import {render} from 'react-dom';
import {Stage, Layer, Rect, Text} from 'react-konva';
import Konva from 'konva';
import {connect} from 'react-redux';

class Snake extends Component {
  state = {
    color: 'black',
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  };
  render() {
    return (
      <Rect
        x={this.props.snake_position.x}
        y={this.props.snake_position.y}
        width={10}
        height={10}
        fill={this.state.color}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    snake_position: state.snake.snake_position,
  };
};

export default connect(mapStateToProps)(Snake);
