import React, {Component} from 'react';
import {render} from 'react-dom';
import {Stage, Layer, Rect, Text} from 'react-konva';
import Konva from 'konva';

class Board extends Component {
  state = {
    color: 'black',
  };

  render() {
    return (
      <Rect
        x={0}
        y={0}
        width={1000}
        height={500}
        fill={this.state.color}
        shadowBlur={5}
      />
    );
  }
}

export default Board;
