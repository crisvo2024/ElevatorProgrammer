import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import bluetoothService from '../../../services/bluetooth/bluetoothService';

const devicesAdapter = createEntityAdapter();

const initialState = devicesAdapter.getInitialState({
  status: 'empty',
  current: null,
});

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    upsertDevice: devicesAdapter.upsertOne,
    selectDevice(state, action) {
      state.current = action.payload;
    },
    devicesLoading(state, action) {
      state.status = 'loading';
    },
    error(state, action) {},
    stopScan(state, action) {
      bluetoothService.stopScan();
    },
  },
});

export const scanDevices = createAsyncThunk(
  'connection/scan',
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    bluetoothService.scan((error, scannedDevice) => {
      if (error !== null) {
        dispatch(connectionSlice.actions.error);
      } else {
        let entity = {
          id: scannedDevice.id,
          name: scannedDevice.name,
        };
        if (entity.name !== null) {
          dispatch(connectionSlice.actions.upsertDevice(entity));
        }
        delete scannedDevice._manager;
        console.log(scannedDevice);
      }
    });
  },
);
export const {selectDevice, devicesLoading, stopScan} = connectionSlice.actions;
export const {selectAll: selectDevices} = devicesAdapter.getSelectors(
  state => state.connection,
);
export default connectionSlice.reducer;
