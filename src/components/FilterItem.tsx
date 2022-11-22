import React, { FC, memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IFilterItem } from '../models/product';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

interface Props {
  item: IFilterItem;
  onItemSelect: (item: IFilterItem | null) => void;
  isSelected: boolean;
}

const FilterListItem: FC<Props> = ({ item, onItemSelect, isSelected }) => {
  const onPress = useCallback(() => {
    onItemSelect(!isSelected ? item : null);
  }, [isSelected, item, onItemSelect]);

  return (
    <TouchableOpacity style={[styles.base, isSelected && styles.baseSelected]} onPress={onPress}>
      <Text
        numberOfLines={2}
        fontSize={16}
        style={[styles.text, isSelected && styles.textSelected]}>
        {item.categories_name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#ffffff',
    height: verticalScale(48),
    maxWidth: horizontalScale(240),
    paddingHorizontal: horizontalScale(36),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseSelected: {
    backgroundColor: '#00276E',
  },
  text: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '700',
  },
  textSelected: { color: '#ffffff' },
});

export default memo(FilterListItem);
