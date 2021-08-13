// 1. Import the extendTheme function
import {extendTheme} from 'native-base';
// 2. Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
  primary: {
    50: '#E3F2F9',
    100: '#C5E4F3',
    200: '#A2D4EC',
    300: '#7AC1E4',
    400: '#47A9DA',
    500: '#0088CC',
    600: '#007AB8',
    700: '#006BA1',
    800: '#005c95',
    900: '#003F5E',
  },
};
const theme = extendTheme({colors: newColorTheme});
export default theme;
