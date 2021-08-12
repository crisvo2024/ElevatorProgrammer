import {createSlice} from '@reduxjs/toolkit';
import levelService from '../../services/card/LevelsService';
const initialState = {
  encoding: '7Seg',
  encodingOptions: levelService.ENCODING_OPTIONS,
  levelOptions: levelService.LEVEL_OPTIONS,
  levels: levelService.level_values,
};
const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    selectEncoding(state, action) {
      state.encoding = action.payload;
    },
    selectValueForLevel: {
      reducer(state, action) {
        const {level, value} = action.payload;
        state.levels[level].value = value;
      },
      prepare(level, value) {
        return {
          payload: {level, value},
        };
      },
    },
  },
});
export const {selectEncoding, selectValueForLevel} = levelsSlice.actions;
export default levelsSlice.reducer;
