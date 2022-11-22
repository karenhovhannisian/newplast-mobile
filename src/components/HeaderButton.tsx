import React, { FC, memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from '../utils/scale';
import Text from './Text';

interface Props {
  onPress: () => void;
  image: any;
  badge?: number;
}

const HeaderButton: FC<Props> = ({ onPress, image, badge }) => (
  <TouchableOpacity onPress={onPress} style={styles.threeDotMenu}>
    <Image source={image} resizeMode="contain" />
    {!!badge && (
      <View style={styles.badge}>
        <Text fontSize={16} style={styles.badgeText}>
          {badge}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -3,
    top: -3,
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: '#ff0f3b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  threeDotMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(60),
    width: moderateScale(60),
  },
});

export default memo(HeaderButton);
