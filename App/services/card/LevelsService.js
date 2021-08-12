import buffer from 'buffer';
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
    this.level_values = [
      {level: 0, value: 43},
      {level: 1, value: 42},
      {level: 2, value: 41},
      {level: 3, value: 0},
      {level: 4, value: 1},
      {level: 5, value: 2},
      {level: 6, value: 3},
      {level: 7, value: 4},
      {level: 8, value: 5},
      {level: 9, value: 6},
      {level: 10, value: 7},
      {level: 11, value: 8},
      {level: 12, value: 9},
      {level: 13, value: 10},
      {level: 14, value: 11},
      {level: 15, value: 12},
      {level: 16, value: 13},
      {level: 17, value: 14},
      {level: 18, value: 15},
      {level: 19, value: 16},
      {level: 20, value: 17},
      {level: 21, value: 18},
      {level: 22, value: 19},
      {level: 23, value: 20},
      {level: 24, value: 21},
      {level: 25, value: 22},
      {level: 26, value: 23},
      {level: 27, value: 24},
      {level: 28, value: 25},
      {level: 29, value: 26},
      {level: 30, value: 27},
      {level: 31, value: 28},
      {level: 32, value: 29},
    ];
  }
  setValueForLevel(level, value) {
    this.level_values[level].value = value;
  }
  decode(levels) {
    return levels.map(i => this.LEVEL_OPTIONS[i]);
  }

  encode(levels) {
    return levels.map(i => this.LEVEL_OPTIONS.indexOf(i));
  }

  send(levels) {
    let start = [0xaa];
    let command = [0x01];
    let data = this.encode(levels);
    let end = [0xcc, 0x33, 0xc3, 0x3c];
    let arrayBuffer = start.concat(command, data, end);
    let bytes = buffer.Buffer.from(arrayBuffer);
    console.log(bytes);
  }
}
export default new LevelsService();
