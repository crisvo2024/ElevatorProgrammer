import {BleManager} from 'react-native-ble-plx';
class BluetoothService {
  constructor() {
    this.manager = new BleManager();
    this.serviceUUID = '0000ffe0-0000-1000-8000-00805F9B34FB';
    this.characteristicUUID = '0000FFE1-0000-1000-8000-00805F9B34FB';
    this.device = null;
  }
  subscribeToState(listener) {
    return this.manager.onStateChange(listener, true);
  }
  scan(listener) {
    this.manager.startDeviceScan([this.serviceUUID], null, listener);
  }
  enable() {
    return this.manager.enable();
  }
  connect(id) {
    this.manager.stopDeviceScan();
    return this.manager.connectToDevice(id).then(
      device => {
        this.device = device;
        return device
          .discoverAllServicesAndCharacteristics()
          .then(() => Promise.resolve());
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
  disconnect() {
    return this.device.cancelConnection().then(() => Promise.resolve());
  }
  readCharacteristic() {
    return this.device.readCharacteristicForService(
      this.serviceUUID,
      this.characteristicUUID,
    );
  }
  writeCharacteristic(data) {
    return this.device.writeCharacteristicWithResponseForService(
      this.serviceUUID,
      this.characteristicUUID,
      data,
    );
  }
  monitorCharacteristic(listener) {
    return this.device.monitorCharacteristicForService(
      this.serviceUUID,
      this.characteristicUUID,
      listener,
    );
  }
}
export default new BluetoothService();
