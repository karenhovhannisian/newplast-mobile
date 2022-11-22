import React, { forwardRef, memo } from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { default as CloseIcon } from '../assets/images/close.svg';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';

interface Props extends TextInputProps {
  icon?: any;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const Input = forwardRef<TextInput, Props>(
  ({ icon, wrapperStyle, value, onChangeText, ...rest }, ref) => {
    return (
      <View style={[styles.base, wrapperStyle]}>
        <TextInput
          ref={ref}
          style={styles.search}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />

        {icon ? (
          value ? (
            <Pressable onPress={() => onChangeText && onChangeText('')}>
              <CloseIcon />
            </Pressable>
          ) : (
            <Image source={icon} />
          )
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: verticalScale(24),
    paddingHorizontal: horizontalScale(48),
    borderColor: '#F2F2F2',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: moderateScale(100),
  },
  search: {
    width: '80%',
    color: 'black',
    fontSize: moderateScale(20),
  },
});

export default memo(Input);
