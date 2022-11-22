import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import EmptyBasketIcon from '../assets/images/shopping.png';
import { moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

const EmptyBasket = () => {
  return (
    <View style={styles.base}>
      <Image style={styles.image} source={EmptyBasketIcon} resizeMode="contain" />
      <Text fontSize={25} style={styles.text}>
        Զամբյուղը դատարկ է
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  base: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  image: {
    width: '60%',
    height: moderateScale(240),
  },
  text: {
    color: '#444',
    paddingTop: verticalScale(20),
    fontWeight: '700',
  },
});
export default memo(EmptyBasket);
