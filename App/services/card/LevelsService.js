import buffer from 'buffer';
import bluetoothService from '../bluetooth/bluetoothService';
class LevelsService {
  LEVEL_OPTIONS = [
    {id: 0, value: '0'},
    {id: 1, value: '1'},
    {id: 2, value: '2'},
    {id: 3, value: '3'},
    {id: 4, value: '4'},
    {id: 5, value: '5'},
    {id: 6, value: '6'},
    {id: 7, value: '7'},
    {id: 8, value: '8'},
    {id: 9, value: '9'},
    {id: 10, value: '10'},
    {id: 11, value: '11'},
    {id: 12, value: '12'},
    {id: 13, value: '13'},
    {id: 14, value: '14'},
    {id: 15, value: '15'},
    {id: 16, value: '16'},
    {id: 17, value: '17'},
    {id: 18, value: '18'},
    {id: 19, value: 'B'},
    {id: 20, value: 'B3'},
    {id: 21, value: 'B2'},
    {id: 22, value: 'B1'},
    {id: 23, value: 'E'},
    {id: 24, value: 'E3'},
    {id: 25, value: 'E2'},
    {id: 26, value: 'E1'},
    {id: 27, value: 'P'},
    {id: 28, value: 'P3'},
    {id: 29, value: 'P2'},
    {id: 30, value: 'P1'},
    {id: 31, value: 'PB'},
    {id: 32, value: 'PH'},
    {id: 33, value: 'PK'},
    {id: 34, value: 'PP'},
    {id: 35, value: 'S'},
    {id: 36, value: 'S3'},
    {id: 37, value: 'S2'},
    {id: 38, value: 'S1'},
    {id: 39, value: 'SC'},
    {id: 40, value: 'SS'},
    {id: 41, value: '-3'},
    {id: 42, value: '-2'},
    {id: 43, value: '-1'},
    {id: 44, value: 'G'},
    {id: 45, value: 'H'},
    {id: 46, value: 'MT'},
    {id: 47, value: 'FL'},
    {id: 48, value: 'L'},
    {id: 49, value: 'LB'},
    {id: 50, value: 'M'},
    {id: 51, value: 'MZ'},
    {id: 52, value: 'TR'},
  ];
  ENCODING_OPTIONS = ['7Seg', 'DC', 'Gray'];
  constructor() {
    this.temporal = [];
  }
  getLevels(listener) {
    const result = bluetoothService.monitorCharacteristic(
      (error, characteristic) => {
        if (characteristic === null) {
          return;
        }
        const decodedData = new Uint8Array(
          buffer.Buffer.from(characteristic.value, 'base64'),
        );
        let old = this.temporal;
        this.temporal = new Uint8Array(old.length + decodedData.length);
        this.temporal.set(old);
        this.temporal.set(decodedData, old.length);
        let end = this.temporal.slice(
          this.temporal.length - 4,
          this.temporal.length,
        );
        let realEnd = new Uint8Array([204, 51, 195, 60]);
        if (end.every((value, index) => value === realEnd[index])) {
          let encoding = this.temporal[this.temporal.length - 5];
          this.temporal = this.temporal.slice(2, this.temporal.length - 5);
          listener({
            levels: Array.prototype.slice
              .call(this.temporal)
              .map((value, index) => {
                return {level: index, value: value};
              }),
            encoding,
          });
          this.temporal = [];
          result.remove();
        }
      },
    );
  }

  async send(levels, encoding) {
    let start = [0xaa];
    let command = [0x01];
    let end = [encoding, 0xcc, 0x33, 0xc3, 0x3c];
    let arrayBuffer = start.concat(
      command,
      levels.map(level => level.value),
      end,
    );
    let bytes = buffer.Buffer.from(arrayBuffer);
    return bluetoothService
      .writeCharacteristic(bytes.toString('base64'))
      .then(() => Promise.resolve());
  }
}
export default new LevelsService();
