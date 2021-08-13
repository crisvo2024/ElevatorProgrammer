import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import bluetoothService from '../../services/bluetooth/bluetoothService';
import {Platform} from 'react-native';

const devicesAdapter = createEntityAdapter();

const initialState = devicesAdapter.getInitialState({
  status: 'empty',
  current: null,
  error: null,
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
    afterError(state, _) {
      state.status = 'empty';
      state.current = null;
      state.error = null;
      devicesAdapter.removeAll(state);
    },
    error(state, action) {
      state.status = 'error';
      state.error = action.payload;
    },
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
      state.error = 'Error al conectar';
    });
    builder.addCase(disconnect.fulfilled, (state, _) => {
      state.status = 'empty';
    });
  },
});
export const checkStatus = createAsyncThunk(
  'connection/check',
  (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    const subscription = bluetoothService.subscribeToState(state => {
      if (state !== 'PoweredOn') {
        if (Platform.OS === 'android') {
          bluetoothService.enable().then(() => dispatch(scanDevices()));
        } else {
          dispatch(
            connectionSlice.actions.error(
              'Active el bluetooth para usar esta aplicación',
            ),
          );
        }
      } else {
        subscription.remove();
      }
    });
  },
);
export const scanDevices = createAsyncThunk(
  'connection/scan',
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(connectionSlice.actions.devicesLoading);
    bluetoothService.scan((error, scannedDevice) => {
      if (error !== null) {
        dispatch(checkStatus());
      } else {
        let entity = {
          id: scannedDevice.id,
          name: scannedDevice.name,
        };
        dispatch(connectionSlice.actions.upsertDevice(entity));
      }
    });
  },
);
export const {selectDevice, afterError} = connectionSlice.actions;
export const {selectAll: selectDevices} = devicesAdapter.getSelectors(
  state => state.connection,
);
export default connectionSlice.reducer;
