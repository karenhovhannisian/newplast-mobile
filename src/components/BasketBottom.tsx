import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { getBasket, getDescription } from '../store/basket/selectors';
import { addDescription } from '../store/basket/slice';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

interface Props {
  onSubmit: () => void;
  hasSelectedManager: boolean;
}

const BasketBottom: FC<Props> = ({ onSubmit, hasSelectedManager }) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(getBasket);
  const description = useAppSelector(getDescription);

  const price = useMemo(() => basket.reduce((acc, curr) => acc + Number(curr.sgumar), 0), [basket]);

  const discountedPrice = useMemo(
    () => basket.reduce((acc, curr) => acc + Number(curr.szgumar), 0),
    [basket],
  );

  const finalPrice = useMemo(
    () => basket.reduce((acc, curr) => acc + Number((curr.sgumar || 0) - (curr.szgumar || 0)), 0),
    [basket],
  );

  const onChangeText = useCallback(
    (text: string) => {
      dispatch(addDescription(text));
    },
    [dispatch],
  );

  return (
    <View style={styles.bottom}>
      <View style={styles.noteContainer}>
        <Text fontSize={26} style={styles.addDescText}>
          Նկարագրություն
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            multiline={true}
            placeholder="Ավելացնել նկարագրություն"
            placeholderTextColor="#b2b2b2"
            style={styles.input}
            value={description}
            onChangeText={onChangeText}
          />
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.prices}>
          <View style={styles.priceLeftItem}>
            <Text fontSize={18} style={styles.priceType}>
              Գին՝
            </Text>
            <Text fontSize={18} style={styles.priceType}>
              Զեղչված գին՝
            </Text>
            <Text fontSize={32} style={styles.finalPriceTitle}>
              Ընդհանուր՝
            </Text>
          </View>
          <View style={styles.priceRightItem}>
            <Text fontSize={18} style={styles.priceType}>
              {price.toString().split('.0000')}
            </Text>
            <Text fontSize={18} style={styles.priceType}>
              {discountedPrice.toFixed(1)}
            </Text>
            <View style={styles.finalPrice}>
              <Text fontSize={22} style={styles.finalPriceText}>
                {finalPrice.toFixed(1)} դրամ
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          disabled={!hasSelectedManager}
          onPress={onSubmit}
          style={[styles.submit, !hasSelectedManager && styles.disabled]}>
          <Text fontSize={24} style={styles.submitText}>
            Հաստատել
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    height: moderateScale(250),
  },
  noteContainer: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingRight: horizontalScale(48),
  },
  addDescButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addDescText: {
    fontWeight: '400',
    color: '#072C7D',
    paddingLeft: horizontalScale(18),
    paddingBottom: verticalScale(12),
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'flex-start',
  },
  input: {
    color: '#072C7D',
    fontSize: moderateScale(22),
  },
  priceContainer: {
    flex: 1,
    backgroundColor: 'blueLight',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  prices: {
    flex: 1,
    flexDirection: 'row',
  },
  priceLeftItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  priceType: { color: '#243f85', fontWeight: '400' },
  priceRightItem: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  finalPriceContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: verticalScale(20),
  },
  finalPrice: {
    paddingHorizontal: horizontalScale(50),
    paddingVertical: verticalScale(10),
    backgroundColor: '#00276E',
    borderBottomLeftRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
  },
  finalPriceTitle: {
    color: '#00276E',
    fontWeight: '700',
  },
  finalPriceText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  submit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0f3b',
    width: '90%',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(40),
    alignSelf: 'flex-start',
  },
  disabled: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default BasketBottom;
