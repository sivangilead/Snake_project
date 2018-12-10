import axios from 'axios';

// ACTION TYPES
const UPDATE_SCORE = 'UPDATE_SCORE';
const INCREMENT_SCORE = 'INCREMENT_SCORE';

// INITIAL STATE
const initialState = 0;

// ACTION CREATORS
export const resetScore = () => {
  return {
    type: UPDATE_SCORE,
    total: 0,
  };
};
export const updateScore = () => {
  return {
    type: INCREMENT_SCORE,
  };
};
//THUNK CREATORS
export const resetScoreThunk = scoreData => async dispatch => {
  try {
    console.log('hi from redux');
    const score = scoreData[0];
    const nameArr = scoreData[1].split(' ');
    const {data} = await axios.post('/api/score', {
      score: score,
      firstname: nameArr[0],
      lastname: nameArr[1],
    });
    dispatch(resetScore());
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.total;
    case INCREMENT_SCORE:
      return state + 1;
    default:
      return state;
  }
};

export default reducer;
