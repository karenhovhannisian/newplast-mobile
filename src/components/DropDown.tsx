import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';
// import { default as ExpandLess } from '../assets/images/expandLess.svg';
// import { default as ExpandMore } from '../assets/images/expandMore.svg';
import { moderateScale, verticalScale } from '../utils/scale';

type DropDownItemType = {
  label: string;
  value: any;
};

interface Props {
  items: Array<DropDownItemType>;
  onChange?: (value: any) => void;
  placeholder?: string;
  size?: number;
}

const DropDown: FC<Props> = ({ items, placeholder, size, onChange }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [value, setValue] = useState<string>('');

  const data = useMemo(
    () => (!value ? items : [{ label: 'Ընտրել', value: '', id: 0 }, ...items]),
    [items, value],
  );

  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  const setActive = useCallback((currentValue: any) => {
    setValue(currentValue);
  }, []);

  return (
    <View style={{ width: size }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentStyle={styles.modal}
        anchor={
          <TouchableOpacity onPress={() => setVisible(true)} onLayout={onLayout}>
            <View pointerEvents={'none'}>
              <TextInput
                value={value}
                mode={'outlined'}
                outlineColor="#d3d8e6"
                label={placeholder}
                pointerEvents={'none'}
                style={styles.dropdown}
                textColor="#072C7D"
              />
              {/* {visible ? <ExpandLess /> : <ExpandMore />} */}
            </View>
          </TouchableOpacity>
        }
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
        }}>
        <ScrollView bounces={false} style={styles.scroll}>
          {data.map((_item, _index) => (
            <TouchableOpacity
              key={_item.value}
              onPress={() => {
                onChange && onChange(_item);
                setActive(_item.value);
                setVisible(false);
              }}>
              <Menu.Item titleStyle={styles.text} title={_item.label} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#d3d8e6',
    fontWeight: '700',
  },
  scroll: {
    maxHeight: verticalScale(200),
  },
  text: {
    color: '#072C7D',
    fontWeight: '700',
    fontSize: moderateScale(24),
  },
  modal: {
    backgroundColor: '#d3d8e6',
  },
});

export default memo(DropDown);
