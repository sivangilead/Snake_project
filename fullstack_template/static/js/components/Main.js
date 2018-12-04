import React, {Component} from 'react';
import {render} from 'react-dom';
import Board from './Board';
import {Stage, Layer, Rect, Text} from 'react-konva';
import Snake from './Snake';
import Food from './Food';
import StartButton from './StartButton';
import Konva from 'konva';
import {connect} from 'react-redux';
import {updatePosition} from '../store/snake';

let initialState = {
  direction: 'right',
  board: {
    max_width: 1000,
    max_height: 500,
  },
  speed: 100,
  food_position: {
    x: 50,
    y: 100,
  },
  snake_tail: [], //nested array for tail rendering
  interval_id: '',
};

class Main extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move_snake = this.move_snake.bind(this);
    this.render_food = this.render_food.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    // For validation that snake can't go back on itself
    let current_dir = this.state.direction;
    console.log(event.which);
    if (
      (event.key == 'ArrowUp' || event.key == 'k') &&
      current_dir !== 'down'
    ) {
      this.setState({direction: 'up'});
      this.move_snake();
    } else if (
      (event.key == 'ArrowRight' || event.key == 'l') &&
      current_dir !== 'left'
    ) {
      this.setState({direction: 'right'});
      this.move_snake();
    } else if (
      (event.key == 'ArrowDown' || event.key == 'j') &&
      current_dir !== 'up'
    ) {
      this.setState({direction: 'down'});
      this.move_snake();
    } else if (
      (event.key == 'ArrowLeft' || event.key == 'h') &&
      current_dir !== 'right'
    ) {
      this.setState({direction: 'left'});
      this.move_snake();
    }
  }

  startGame() {
    clearInterval(this.state.interval_id);
    this.setState(initialState);
    this.setState({snake_tail: []});
    console.log(this.state);
    let interval_id = setInterval(this.move_snake, this.state.speed);
    this.setState({interval_id: interval_id});
  }

  render_food() {
    let x_max = 1000;
    let y_max = 500;
    let posX = Math.floor((Math.random() * (x_max + 1)) / 10) * 10;
    let posY = Math.floor((Math.random() * (y_max + 1)) / 10) * 10;
    this.setState({
      food_position: {
        x: posX,
        y: posY,
      },
    });
  }

  async move_snake() {
    let direction = this.state.direction;
    let current_height = this.props.snake_position.y;
    let current_width = this.props.snake_position.x;
    let tail = this.state.snake_tail;
    let max_height = this.state.board.max_height;
    let max_width = this.state.board.max_width;
    let food_height = this.state.food_position.y;
    let food_width = this.state.food_position.x;
    let updatePosition = this.props.updatePosition;
    //snake exceeding board limitaion
    if (current_width < 0 || current_width >= max_width) {
      let flag = confirm('Game Over');
      if (flag == true) {
        clearInterval(this.state.interval_id);
        await this.setState(initialState);

        direction = this.state.direction;
        current_height = this.props.snake_position.y;
        current_width = this.props.snake_position.x;
        tail = this.state.snake_tail;
        max_height = this.state.board.max_height;
        max_width = this.state.board.max_width;
        food_height = this.state.food_position.y;
      }
    } else if (current_height < 0 || current_height >= max_height) {
      let flag = confirm('Game Over');
      if (flag == true) {
        clearInterval(this.state.interval_id);
        await this.setState(initialState);

        direction = this.state.direction;
        current_height = this.props.snake_position.y;
        current_width = this.props.snake_position.x;
        tail = this.state.snake_tail;
        max_height = this.state.board.max_height;
        max_width = this.state.board.max_width;
        food_height = this.state.food_position.y;
      }
    }
    if (tail.length !== 0) {
      tail.pop();
      tail.unshift([current_width, current_height]);
    }

    this.setState({snake_tail: tail});

    if (direction === 'up') {
      updatePosition({y: current_height - 10, x: current_width});
    } else if (direction === 'right') {
      updatePosition({y: current_height, x: current_width + 10});
    } else if (direction === 'down') {
      updatePosition({y: current_height + 10, x: current_width});
    } else if (direction === 'left') {
      updatePosition({y: current_height, x: current_width - 10});
    }
    if (food_height === current_height && food_width === current_width) {
      tail.push([current_height, current_width]);
      tail.pop();
      tail.unshift([current_width, current_height]);
      let updatedSpeed = this.state.speed - 10;
      this.setState({snake_tail: tail, speed: updatedSpeed});
      clearInterval(this.state.interval_id);
      let interval_id = setInterval(this.move_snake, this.state.speed);
      this.setState({interval_id: interval_id});
      this.render_food();
    }
  }

  render() {
    return (
      <div>
        <Stage
          ref={ref => {
            this.stageRef = ref;
          }}
          width={this.state.board.max_width}
          height={this.state.board.max_height}>
          <Layer>
            <Board />
            <Snake />
            {this.state.snake_tail
              ? this.state.snake_tail.map((tail, index) => {
                  return <Snake key={index} posX={tail[0]} posY={tail[1]} />;
                })
              : null}
            <Food
              posX={this.state.food_position.x}
              posY={this.state.food_position.y}
            />
          </Layer>
        </Stage>
        <StartButton startGame={this.startGame} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    snake_position: state.snake.snake_position,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updatePosition: position => dispatch(updatePosition(position)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);