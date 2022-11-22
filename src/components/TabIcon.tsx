import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Tick from '../assets/images/Tick.png';
import { moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

interface TabIconProps {
  icon: any;
  title?: string;
  focused: boolean;
}

const TabIcon: FC<TabIconProps> = ({ icon, title, focused }) => {
  return (
    <View style={styles.component}>
      <Image style={styles.icon} source={icon} resizeMode="contain" />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {focused && <Image source={Tick} />}
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: '700',
    paddingBottom: verticalScale(6),
  },
  icon: {
    height: verticalScale(48),
    color: '#ffffff',
  },
});

export default TabIcon;
