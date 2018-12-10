import axios from 'axios';

// ACTION TYPES
const UPDATE_SCORE = 'UPDATE_SCORE';
const INCREMENT_SCORE = 'INCREMENT_SCORE';
const TOP_SCORE = 'TOP SCORE';
const GET_SCORES = 'GET_SCORES';
// INITIAL STATE
const initialState = {
  current: 0,
  topscore: 0,
  scoresList: [],
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

export const updateScores = data => {
  return {
    type: GET_SCORES,
    scores: data,
  };
};

//THUNK CREATORS
export const resetScoreThunk = scoreData => async dispatch => {
  try {
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

export const getScores = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/score/topScores');
    dispatch(updateScores(data));
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
    case GET_SCORES:
      return {...state, scoresList: action.scores};
    default:
      return state;
  }
};

export default reducer;
