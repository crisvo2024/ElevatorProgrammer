import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: 'empty',
  current: null,
  devices: [
    {name: 'Santiago1', Mac: 'E9-04-67-9F-92-50'},
    {name: 'Santiago2', Mac: 'E9-04-67-9F-92-51'},
    {name: 'Santiago3', Mac: 'E9-04-67-9F-92-52'},
  ],
};
const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    selectDevice(state, action) {
      state.current = action.payload;
    },
    devicesLoading(state, action) {
      state.status = 'loading';
    },
  },
});
export const {selectDevice, devicesLoading} = connectionSlice.actions;
export default connectionSlice.reducer;
