import {combineReducers} from 'redux';

const INITIAL_STATE = {
  current: null,
  devices: [
    {name: 'Santiago1', Mac: 'E9-04-67-9F-92-50'},
    {name: 'Santiago2', Mac: 'E9-04-67-9F-92-51'},
    {name: 'Santiago3', Mac: 'E9-04-67-9F-92-52'},
  ],
};
const subjectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECT_DEVICE':
      const {devices} = state;
      return {current: action.payload, devices};
    default:
      return state;
  }
};
export default combineReducers({
  subjects: subjectsReducer,
});
