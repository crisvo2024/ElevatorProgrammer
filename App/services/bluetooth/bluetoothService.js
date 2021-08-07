import {BleManager} from 'react-native-ble-plx';
class BluetoothService {
  constructor() {
    this.manager = new BleManager();
  }
  subscribeToState(listener) {
    this.subscription = this.manager.onStateChange(listener, true);
  }
  scan(listener) {
    this.manager.startDeviceScan(null, null, listener);
  }
  stopScan() {
    console.log('stop');
    this.manager.stopDeviceScan();
  }
}
export default new BluetoothService();
