const initialState = {
  snake_position: {
    x: 500,
    y: 250,
  },
  speed: 100,
};

const UPDATE_SNAKE_POSITION = 'UPDATE_SNAKE_POSITION';
const UPDATE_TAIL = 'UPDATE_TAIL';
const RESET_TAIL = 'RESET_TAIL';

export const updatePosition = position => {
  return {type: UPDATE_SNAKE_POSITION, position};
};

export const updateTail = tail => {
  return {type: UPDATE_TAIL, tail};
};

export const resetTail = () => {
  return {type: RESET_TAIL};
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SNAKE_POSITION:
      return {
        ...state,
        snake_position: action.position,
      };
    case UPDATE_TAIL:
      return {
        ...state,
        snake_tail: action.tail,
      };
    case RESET_TAIL:
      return {
        ...state,
        snake_tail: [],
      };
    default:
      return state;
  }
}
