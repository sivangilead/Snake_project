import axios from 'axios';

// ACTION TYPES
const UPDATE_SCORE = 'UPDATE_SCORE';
const INCREMENT_SCORE = 'INCREMENT_SCORE';
const TOP_SCORE = 'TOP SCORE';

// INITIAL STATE
const initialState = {
  current: 0,
  topscore: 0,
};
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

export const topScore = topscore => {
  return {
    type: TOP_SCORE,
    topscore: topscore,
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
    if (Number.isInteger(data)) {
      dispatch(topScore(data));
    }
    dispatch(resetScore());
  } catch (err) {
    console.error(err);
  }
};

export const updateTopScore = name => async dispatch => {
  try {
    let nameArr = name.split(' ');
    const {data} = await axios.get(
      `/api/score?firstname=${nameArr[0]}&lastname=${nameArr[1]}`,
    );
    dispatch(topScore(data[0]));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return {...state, current: action.total};
    case INCREMENT_SCORE:
      return {...state, current: state.current + 1};
    case TOP_SCORE:
      return {...state, topscore: action.topscore};
    default:
      return state;
  }
};

export default reducer;
