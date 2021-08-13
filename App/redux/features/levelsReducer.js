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
  encoding: 0,
  encodingOptions: levelsService.ENCODING_OPTIONS,
  levelOptions: levelsService.LEVEL_OPTIONS,
});
export const sendLevels = createAsyncThunk(
  'levels/sendLevel',
  async (args, thunkAPI) => {
    const entities = levelsAdapter
      .getSelectors(state => state.levels)
      .selectAll(thunkAPI.getState());
    const encoding = thunkAPI.getState().levels.encoding;
    return levelsService.send(entities, encoding);
  },
);
const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    selectEncoding(state, action) {
      state.encoding = action.payload;
    },
    toInitial(state, _) {
      state.status = 'loading';
    },
    setLevels(state, action) {
      levelsAdapter.setAll(state, action.payload.levels);
      state.encoding = action.payload.encoding;
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
    levelsService.getLevels(result => {
      thunkApi.dispatch(levelsSlice.actions.setLevels(result));
    });
  },
);
export const {selectIds: selectLevelsIds, selectById: selectLevelById} =
  levelsAdapter.getSelectors(state => state.levels);
export const {selectEncoding, selectValueForLevel, toInitial} =
  levelsSlice.actions;
export default levelsSlice.reducer;
