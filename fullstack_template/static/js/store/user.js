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
export const updateNameThunk = name => async dispatch => {
  try {
    let nameArr = name.split(' ');
    const {data} = await axios.post('/api/', {
      firstname: nameArr[0],
      lastname: nameArr[1],
    });
    console.log('====>', data);
    dispatch(updateName(data));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      let name = action.name[0] + ' ' + action.name[1];
      return name;
    default:
      return state;
  }
};

export default reducer;
