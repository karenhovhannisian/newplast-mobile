import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants';

const baseWidth = 1920;
const baseHeight = 1200;

const horizontalScale = (size: number) => (WINDOW_WIDTH / baseWidth) * size;
const verticalScale = (size: number) => (WINDOW_HEIGHT / baseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
