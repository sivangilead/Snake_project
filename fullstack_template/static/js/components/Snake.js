import React, {Component} from 'react';
import {render} from 'react-dom';
import {Stage, Layer, Rect, Text} from 'react-konva';
import Konva from 'konva';
import {connect} from 'react-redux';

class Snake extends Component {
  state = {
    color: 'green',
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  };
  render() {
    return (
      <Rect
        x={this.props.posX}
        y={this.props.posY}
        width={10}
        height={10}
        fill={this.state.color}
      />
    );
  }
}

export default Snake;
