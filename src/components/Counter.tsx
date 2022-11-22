import React, { FC, memo, useCallback, useRef } from 'react';
import {
  TextInput as NativeTextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { default as Plus } from '../assets/images/add.svg';
import { default as Minus } from '../assets/images/minus.svg';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import { TextInput } from '.';

interface Props {
  count: number;
  onChange: (value: number) => void;
}

const Counter: FC<Props> = ({ count = 1, onChange }) => {
  const inputRef = useRef<NativeTextInput>(null);
  const onIncrease = useCallback(() => onChange(++count), [count, onChange]);
  const onDecrease = useCallback(
    () => (count === 1 ? undefined : onChange(--count)),
    [count, onChange],
  );

  const handleInput = useCallback(
    (text: string) => {
      if (!isNaN(Number(text))) {
        if (Number(text) < 0) {
          return onChange(1);
        }
        return onChange(Number(text));
      }
    },
    [onChange],
  );

  const handleFocus = useCallback(() => inputRef.current?.focus(), []);

  return (
    <Pressable onPress={handleFocus} style={styles.base}>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Minus />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.count}
        value={count.toString()}
        wrapperStyle={styles.inputWrapper}
        keyboardType="number-pad"
        onChangeText={handleInput}
      />
      <TouchableOpacity style={[styles.button, styles.plusButton]} onPress={onIncrease}>
        <Plus />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(60),
    paddingHorizontal: horizontalScale(24),
  },
  button: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0f0',
  },
  plusButton: {
    backgroundColor: '#d3d8e6',
  },
  inputWrapper: {
    borderRadius: 12,
    width: 86,
    paddingHorizontal: 12,
  },
  count: {
    fontWeight: '700',
    color: '#072C7D',
    textAlign: 'center',
    fontSize: moderateScale(24),
  },
  buttonContent: {
    textAlign: 'center',
    fontWeight: '800',
    color: '#072C7D',
  },
});

export default memo(Counter);
