import React, { FC, memo, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { default as ExpandLess } from '../assets/images/expandLess.svg';
import { default as ExpandMore } from '../assets/images/expandMore.svg';
import { moderateScale } from '../utils/scale';

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
  const [open, setOpen] = useState<boolean>(false);
  const [selectedManagerName, setSelectedManager] = useState<string>('');

  const data = useMemo(
    () => (!selectedManagerName ? items : [{ label: 'Ընտրել', value: '', id: 0 }, ...items]),
    [items, selectedManagerName],
  );

  return (
    <DropDownPicker
      multiple={false}
      value={selectedManagerName}
      setValue={setSelectedManager}
      onSelectItem={onChange}
      items={data}
      style={[styles.dropdown, { width: size }]}
      open={open}
      setOpen={setOpen}
      placeholder={placeholder}
      textStyle={styles.text}
      modalTitleStyle={styles.text}
      dropDownContainerStyle={[styles.modal, { width: size }]}
      ArrowDownIconComponent={() => <ExpandMore />}
      ArrowUpIconComponent={() => <ExpandLess />}
      closeOnBackPressed={true}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 130,
    backgroundColor: '#d3d8e6',
    borderBottomColor: 'transparent',
  },
  text: {
    color: '#072C7D',
    fontWeight: '700',
    fontSize: moderateScale(24),
  },
  modal: {
    borderWidth: 0,
    backgroundColor: '#d3d8e6',
    minWidth: 130,
  },
});

export default memo(DropDown);
