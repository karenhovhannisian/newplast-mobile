import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/images/Back.svg';
import OrderSuccess from '../../assets/images/OrderSuccess.png';
import { Text } from '../../components';
import { MainNavigatorProp } from '../../navigation/MainNavigator';
import { horizontalScale } from '../../utils/scale';

export const SuccessScreen = () => {
  const navigation = useNavigation<MainNavigatorProp>();
  return (
    <View style={styles.base}>
      <Image source={OrderSuccess} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
        style={styles.content}>
        <BackIcon />

        <Text fontSize={20} style={styles.textStyle}>
          Վերադառնալ{' '}
          <Text fontSize={20} style={styles.underlineText}>
            Գլխավոր էջ
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
    fontWeight: '900',
    paddingLeft: horizontalScale(40),
  },
  underlineText: {
    color: '#072C7D',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
