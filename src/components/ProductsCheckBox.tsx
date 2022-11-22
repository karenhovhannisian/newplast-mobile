import React, { FC, memo, useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import RadioCheckedIcon from '../assets/images/radioChecked.png';
import RadioUncheckedIcon from '../assets/images/radioUnchecked.png';
import { horizontalScale } from '../utils/scale';
import Text from './Text';

interface Props {
  type: string;
  isSelected?: boolean;
  onChange: (value: string) => void;
  isFirst: boolean;
}

const ProductCheckBox: FC<Props> = ({ type, isSelected, isFirst, onChange }) => {
  const handlePress = useCallback(() => {
    onChange(type);
  }, [onChange, type]);
  return (
    <TouchableOpacity style={[styles.base, isFirst && styles.first]} onPress={handlePress}>
      <Text style={styles.text} fontSize={24}>
        {type}
      </Text>
      <Image
        source={isSelected ? RadioCheckedIcon : RadioUncheckedIcon}
        style={isSelected && styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: horizontalScale(80),
  },
  first: { marginLeft: 0 },

  text: {
    color: '#161616',
    paddingRight: horizontalScale(30),
    fontWeight: '700',
  },
  icon: { tintColor: '#00276E' },
});

export default memo(ProductCheckBox);
