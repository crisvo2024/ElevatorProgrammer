import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import levelsService from '../../services/card/LevelsService';
const levelsAdapter = createEntityAdapter({
  selectId: entity => entity.level,
});
const initialState = levelsAdapter.getInitialState({
  status: 'loading',
  encoding: '7Seg',
  encodingOptions: levelsService.ENCODING_OPTIONS,
  levelOptions: levelsService.LEVEL_OPTIONS,
});
export const sendLevels = createAsyncThunk(
  'levels/sendLevel',
  async (args, thunkAPI) => {
    const entities = levelsAdapter
      .getSelectors(state => state.levels)
      .selectAll(thunkAPI.getState());
    return levelsService.send(entities);
  },
);
const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    selectEncoding(state, action) {
      state.encoding = action.payload;
    },
    setLevels(state, action) {
      levelsAdapter.setAll(state, action.payload);
      state.status = 'loaded';
    },
    selectValueForLevel: {
      reducer(state, action) {
        const {level, value} = action.payload;
        state.entities[level].value = value;
      },
      prepare(level, value) {
        return {
          payload: {level, value},
        };
      },
    },
  },
  extraReducers: builder => {
    builder.addCase(sendLevels.pending, (state, _) => {
      state.status = 'loading';
    });
    builder.addCase(sendLevels.fulfilled, (state, _) => {
      state.status = 'sent';
    });
  },
});
export const getCurrentLevels = createAsyncThunk(
  'levels/getCurrentLevel',
  (args, thunkApi) => {
    levelsService.getLevels(array => {
      thunkApi.dispatch(levelsSlice.actions.setLevels(array));
    });
  },
);
export const {selectIds: selectLevelsIds, selectById: selectLevelById} =
  levelsAdapter.getSelectors(state => state.levels);
export const {selectEncoding, selectValueForLevel} = levelsSlice.actions;
export default levelsSlice.reducer;
