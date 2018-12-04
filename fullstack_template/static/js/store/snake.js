const initialState = {
  direction: 'right',
  snake_position: {
    x: 500,
    y: 250,
  },
  speed: 100,
  snake_tail: [],
};

const UPDATE_SNAKE_POSITION = 'UPDATE_SNAKE_POSITION';

export const updatePosition = position => {
  return {type: UPDATE_SNAKE_POSITION, position};
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SNAKE_POSITION:
      return {
        ...state,
        snake_position: action.position,
      };
    default:
      return state;
  }
}
