import {BleManager} from 'react-native-ble-plx';
class BluetoothService {
  constructor() {
    this.manager = new BleManager();
    this.device = null;
  }
  subscribeToState(listener) {
    this.subscription = this.manager.onStateChange(listener, true);
  }
  scan(listener) {
    this.manager.startDeviceScan(null, null, listener);
  }
  connect(id) {
    this.manager.stopDeviceScan();
    return this.manager.connectToDevice(id).then(device => {
      this.device = device;
      return device
        .discoverAllServicesAndCharacteristics()
        .then(() => Promise.resolve());
    });
  }
  readCharacteristic(serviceUUID, characteristicUUID) {
    return this.device.readCharacteristicForService(
      serviceUUID,
      characteristicUUID,
    );
  }
  writeCharacteristic(serviceUUID, characteristicUUID, data) {
    return this.device.writeCharacteristicWithResponseForService(
      serviceUUID,
      characteristicUUID,
      data,
    );
  }
  monitorCharacteristic(serviceUUID, characteristicUUID) {
    return this.device.monitorCharacteristicForDevice(
      serviceUUID,
      characteristicUUID,
    );
  }
}
export default new BluetoothService();
