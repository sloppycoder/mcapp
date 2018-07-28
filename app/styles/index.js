import { Platform, StatusBar, StyleSheet } from 'react-native';

import borders from './borders';
import colors from './colors';
import flexbox from './flexbox';
import fontWeights from './fontWeights';
import heights from './heights';
import images from './images';
import opacity from './opacity';
import spacing from './spacing';
import text from './text';
import typeScale from './typeScale';
import utilities from './utilities';
import widths from './widths';

export const styles = Object.assign(
  {},
  borders,
  flexbox,
  fontWeights,
  heights,
  images,
  opacity,
  spacing,
  text,
  typeScale,
  utilities,
  widths,
  colors.styles,
  { palette: colors.palette }
);

const defaultMarginTop =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0;
