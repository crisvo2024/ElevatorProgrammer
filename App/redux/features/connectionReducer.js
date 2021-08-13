import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import bluetoothService from '../../services/bluetooth/bluetoothService';

const devicesAdapter = createEntityAdapter();

const initialState = devicesAdapter.getInitialState({
  status: 'empty',
  current: null,
});
export const connectToDevice = createAsyncThunk(
  'connection/connect',
  async id => {
    return await bluetoothService.connect(id);
  },
);
export const disconnect = createAsyncThunk(
  'connection/disconnect',
  async () => {
    return await bluetoothService.disconnect();
  },
);
const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    upsertDevice: devicesAdapter.upsertOne,
    selectDevice(state, action) {
      state.current = action.payload;
    },
    devicesLoading(state, _) {
      state.status = 'loading';
    },
    error(state, action) {},
  },
  extraReducers: builder => {
    builder.addCase(connectToDevice.fulfilled, (state, _) => {
      state.status = 'connected';
    });
    builder.addCase(connectToDevice.pending, (state, _) => {
      state.status = 'connecting';
    });
    builder.addCase(connectToDevice.rejected, (state, _) => {
      state.status = 'error';
    });
    builder.addCase(disconnect.fulfilled, (state, _) => {
      state.status = 'empty';
    });
  },
});

export const scanDevices = createAsyncThunk(
  'connection/scan',
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(connectionSlice.actions.devicesLoading);
    bluetoothService.scan((error, scannedDevice) => {
      if (error !== null) {
        dispatch(connectionSlice.actions.error);
      } else {
        let entity = {
          id: scannedDevice.id,
          name: scannedDevice.name,
        };
        dispatch(connectionSlice.actions.upsertDevice(entity));
        //
        // delete scannedDevice._manager;
        // console.log(scannedDevice);
      }
    });
  },
);
export const {selectDevice} = connectionSlice.actions;
export const {selectAll: selectDevices} = devicesAdapter.getSelectors(
  state => state.connection,
);
export default connectionSlice.reducer;
