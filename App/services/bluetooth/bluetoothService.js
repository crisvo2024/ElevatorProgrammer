import {BleManager} from 'react-native-ble-plx';
const bleManager = new BleManager();
function scanAndConnect() {}
export const initialize = () => {
  const subscription = bleManager.onStateChange(state => {
    if (state === 'PoweredOn') {
      scanAndConnect();
      subscription.remove();
    }
  }, true);
};
