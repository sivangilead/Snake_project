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
// THUNK CREATORS
//export const setHighScore = (
//  score,
//  currentCategory,
//  user,
//) => async dispatch => {
//  try {
//    const res = await axios.put(`/api/users/${user.id}/scores`, {
//      score: score,
//      category: currentCategory,
//    });
//  } catch (err) {
//    console.error(err);
//  }
//};

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
