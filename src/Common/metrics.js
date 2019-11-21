import { Dimensions, Platform } from 'react-native';

import ExtraDimensions from 'react-native-extra-dimensions-android';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
const { width: deviceWidth } = Dimensions.get('window');
let { height: deviceHeight } = Dimensions.get('window');

export const isIphoneXorXS =
    isIOS && (deviceWidth === 812 || deviceHeight === 812);
export const isIphoneXRorXSMax =
    isIOS && (deviceWidth === 896 || deviceHeight === 896);
export const isIphoneSmall =
    isIOS && (deviceWidth === 568 || deviceHeight === 568); // 5, 5S, SE
export const isIphoneMedium =
    isIOS && (deviceWidth === 667 || deviceHeight === 667); // 6, 6S, 7, 8
export const isIphonePlus =
    isIOS && (deviceWidth === 736 || deviceHeight === 736); // 6+, 6S+, 7+, 8+
export const isIphoneLargest = isIphoneXorXS || isIphoneXRorXSMax;

if (isAndroid) {
    deviceHeight = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
}

const isRippleEffectSupported = isAndroid && Platform.Version >= 21;

const designWidth = 375;
const designHeight = 812;

const scale = deviceWidth / designWidth;
export const isSmallDevice = deviceHeight < designHeight;

export const normalize = (value: number) => parseInt(`${value * scale}`, 10);

export const sketchSize = (value: number) => Math.round((value / 3) * scale);

const keyboardOffset = deviceHeight / 7;
const scrollViewContentInset = { bottom: sketchSize(80) };

export const metrics = {
    isIOS,
    normalize,
    isAndroid,
    deviceWidth,
    deviceHeight,
    isIphonePlus,
    isIphoneSmall,
    isIphoneXorXS,
    isIphoneMedium,
    isIphoneLargest,
    isIphoneXRorXSMax,
    isRippleEffectSupported,
    sketchSize,
    keyboardOffset,
    scrollViewContentInset
};

export default metrics;
