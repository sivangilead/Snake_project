import axios from 'axios';

// ACTION TYPES
const UPDATE_NAME = 'UPDATE_NAME';

// INITIAL STATE
const initialState = '';

// ACTION CREATORS
export const updateName = name => {
  return {
    type: UPDATE_NAME,
    name: name,
  };
};

// THUNK CREATORS
//export const updateNameThunk = name => async dispatch => {
//  try {
//    const {data} = await axios.post('/api/user', {name: name});
//    dispatch(updateName(name));
//  } catch (err) {
//    console.error(err);
//  }
//};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return action.name;
    default:
      return state;
  }
};

export default reducer;
