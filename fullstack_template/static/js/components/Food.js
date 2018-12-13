import React, {Component} from 'react';
import {render} from 'react-dom';
import {Stage, Layer, Rect, Text} from 'react-konva';
import Konva from 'konva';

class Snake extends Component {
  state = {
    color: 'red',
  };

  render() {
    return (
      <Rect
        x={this.props.posX}
        y={this.props.posY}
        width={20}
        height={20}
        fill={this.state.color}
      />
    );
  }
}

export default Snake;
