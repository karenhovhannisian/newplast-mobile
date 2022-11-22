import React, { FC, memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StoreIcon from '../assets/images/store.svg';
import { MainNavigatorProp } from '../navigation/MainNavigator';
import { useAppDispatch } from '../store';
import { initializeBasket, setCustomerId } from '../store/basket/slice';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

interface Props {
  id: string;
  name: string;
  address: string;
  debt: string;
  discount: string;
  isHeader?: boolean;
}

const CustomerListItem: FC<Props> = ({ id, name, address, debt, discount, isHeader = false }) => {
  const navigation = useNavigation<MainNavigatorProp>();
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    dispatch(setCustomerId(id));
    dispatch(initializeBasket({ activeOrderId: Date.now() }));

    navigation.push('Products');
  }, [dispatch, id, navigation]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.base}>
      {!isHeader && <StoreIcon />}
      <Text fontSize={16} style={[styles.text, styles.big]}>
        {name}
      </Text>
      <Text fontSize={16} style={[styles.text, styles.big]}>
        {address}
      </Text>
      <Text fontSize={16} style={styles.text}>
        {isHeader ? debt : `${Number(debt).toFixed()} դր`}
      </Text>
      <Text fontSize={16} style={styles.text}>
        {isHeader ? discount : `${Number(discount).toFixed()} %`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    backgroundColor: '#ffffff',
    height: moderateScale(60),
    marginBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(64),
  },
  text: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: horizontalScale(24),
    color: '#333333',
  },
  big: {
    flex: 2,
  },
});

export default memo(CustomerListItem);
